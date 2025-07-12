import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Países válidos del comité
const committeeCountries = [
  "Afghanistan", "Mali", "Bangladesh", "Myanmar", "Belgium", "Norway", "Brazil", "Pakistan",
  "Burkina Faso", "Palestine", "Canada", "Philippines", "China", "Poland", "Democratic Republic of the Congo",
  "Portugal", "Ethiopia", "Russia", "France", "South Korea", "Germany", "Spain", "Haiti", "Sudan",
  "Hungary", "Sweden", "India", "Syria", "Iran", "The Netherlands", "Israel", "Turkey", "Italy",
  "Ukraine", "Japan", "United Kingdom", "Jordan", "United States", "Lebanon", "Yemen", "Australia",
  "New Zealand", "Morocco", "Greece", "Argentina", "Czech Republic"
];

const zoneStrategies = {
  Red: [
    "Deploy trauma units",
    "Enable telehealth",
    "Establish Safe Access Zones (SAZs)",
    "Document attacks via HPAM"
  ],
  Yellow: [
    "Build modular clinics",
    "Train local volunteer brigades",
    "Coordinate with NGOs",
    "Activate early-warning systems"
  ],
  Green: [
    "Rehabilitate permanent hospitals",
    "Conduct vaccination campaigns",
    "Launch medical training programs",
    "Transition to local health authority"
  ]
};

const ZoneInfoPanel = ({ incident }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [tempSelection, setTempSelection] = useState([]);
  const [editing, setEditing] = useState(false);
  const [showMeasures, setShowMeasures] = useState(false);

  const zone = incident?.zone;
  const incidentId = incident?.id;

  // 🔽 Cargar selección al hacer click en un marcador
  useEffect(() => {
    const fetchSelection = async () => {
      if (!incidentId) return;

      try {
        const docRef = doc(db, 'zones', incidentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSelectedCountries(docSnap.data().countries || []);
          setTempSelection(docSnap.data().countries || []);
          setEditing(false);
        } else {
          setSelectedCountries([]);
          setTempSelection([]);
          setEditing(true);
        }
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    fetchSelection();
  }, [incidentId]);

  // ✅ Guardar en Firestore
  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'zones', incidentId), {
        countries: tempSelection
      });
      setSelectedCountries(tempSelection);
      setEditing(false);
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setTempSelection((prev) =>
      checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  };

  if (!incident) {
    return <p style={{ fontStyle: 'italic', color: '#666' }}>Click a marker to view zone information.</p>;
  }

  return (
    <div>
      <h2 style={{ color: zone === "Red" ? "#cc0000" : zone === "Yellow" ? "#e6b800" : "#28a745" }}>
        {incident.location}, {incident.country}
      </h2>
      <p><b>Zone Level:</b> {zone}</p>
      <p><b>Description:</b> {incident.description}</p>

      <div>
        <h4>Solutions by country:</h4>

        {selectedCountries.length > 0 && !editing ? (
          <>
            <ul>
              {selectedCountries.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <button onClick={() => setEditing(true)}>Edit Selection</button>
          </>
        ) : (
          <>
            <div style={{
              maxHeight: 100,
              overflowY: 'scroll',
              border: '1px solid #ccc',
              padding: '0.5rem',
              marginBottom: '1rem'
            }}>
              {committeeCountries.map((country) => (
                <div key={country}>
                  <label>
                    <input
                      type="checkbox"
                      value={country}
                      onChange={handleChange}
                      checked={tempSelection.includes(country)}
                    />
                    {` ${country}`}
                  </label>
                </div>
              ))}
            </div>
            <button onClick={handleSave}>Save Selection</button>
          </>
        )}

        {selectedCountries.length > 0 && (
          <>
            <button onClick={() => setShowMeasures(!showMeasures)} style={{ marginTop: '1rem' }}>
              {showMeasures ? "Hide" : "Show"} Recommended Measures (HZRF/HPAM)
            </button>
            {showMeasures && (
              <div style={{ marginTop: '1rem' }}>
                <ul>
                  {zoneStrategies[zone].map((measure, i) => (
                    <li key={i}>{measure}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h4>Color legend:</h4>
        <ul>
          <li><b style={{ color: '#cc0000' }}>Red:</b> Total collapse – immediate trauma response</li>
          <li><b style={{ color: '#e6b800' }}>Yellow:</b> Limited access – field clinics & volunteer support</li>
          <li><b style={{ color: '#28a745' }}>Green:</b> Recovery phase – training & infrastructure</li>
        </ul>
      </div>
    </div>
  );
};

export default ZoneInfoPanel;
