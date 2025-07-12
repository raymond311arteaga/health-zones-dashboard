import React, { useState } from 'react';

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
  const [showMeasures, setShowMeasures] = useState(false);

  const handleCountryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCountries((prev) =>
      checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  };

  const zone = incident?.zone;

  return (
    <div>
      {!incident ? (
        <>
          <p style={{ fontStyle: 'italic', color: '#666' }}>Click a marker to view zone information.</p>
        </>
      ) : (
        <>
          <h2 style={{ color: zone === "Red" ? "#cc0000" : zone === "Yellow" ? "#e6b800" : "#28a745" }}>
            {incident.location}, {incident.country}
          </h2>
          <p><b>Zone Level:</b> {zone}</p>
          <p><b>Description:</b> {incident.description}</p>

          <div>
            <h4>Show solutions by country:</h4>
            <div style={{ maxHeight: 100, overflowY: 'scroll', border: '1px solid #ccc', padding: '0.5rem', marginBottom: '1rem' }}>
              {committeeCountries.map((country) => (
                <div key={country}>
                  <label>
                    <input
                      type="checkbox"
                      value={country}
                      onChange={handleCountryChange}
                      checked={selectedCountries.includes(country)}
                    />
                    {` ${country}`}
                  </label>
                </div>
              ))}
            </div>

            <button onClick={() => setShowMeasures(!showMeasures)}>
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
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h4>Color legend:</h4>
            <ul>
              <li><b style={{ color: '#cc0000' }}>Red:</b> Total collapse – immediate trauma response</li>
              <li><b style={{ color: '#e6b800' }}>Yellow:</b> Limited access – field clinics & volunteer support</li>
              <li><b style={{ color: '#28a745' }}>Green:</b> Recovery phase – training & infrastructure</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ZoneInfoPanel;
