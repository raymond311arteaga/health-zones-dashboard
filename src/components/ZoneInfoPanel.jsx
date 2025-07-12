import React from 'react';

const zoneStyles = {
  Red: {
    color: '#cc0000',
    measures: [
      "Deploy trauma units",
      "Enable telehealth",
      "Establish Safe Access Zones (SAZs)",
      "Document via HPAM"
    ]
  },
  Yellow: {
    color: '#e6b800',
    measures: [
      "Build modular clinics",
      "Train local volunteer brigades",
      "Coordinate with NGOs",
      "Early-warning monitoring"
    ]
  },
  Green: {
    color: '#28a745',
    measures: [
      "Rehabilitate permanent hospitals",
      "Conduct vaccination campaigns",
      "Medical education programs",
      "Transition to local health authority"
    ]
  }
};

const ZoneInfoPanel = ({ incident }) => {
  const legend = (
    <div style={{ marginTop: '1.5rem' }}>
      <h4>What each color means (HZRF):</h4>
      <ul>
        <li><b style={{ color: '#cc0000' }}>Red</b>: Total collapse – urgent trauma care, SAZs, international aid.</li>
        <li><b style={{ color: '#e6b800' }}>Yellow</b>: Partially functional – field clinics, volunteers, NGO support.</li>
        <li><b style={{ color: '#28a745' }}>Green</b>: Recovery – local systems, education, long-term health planning.</li>
      </ul>
    </div>
  );

  if (!incident) {
    return (
      <div style={{ fontStyle: 'italic', color: '#666' }}>
        Click a marker to view zone data.
        {legend}
      </div>
    );
  }

  const zone = zoneStyles[incident.zone];

  return (
    <div>
      <h2 style={{ color: zone.color }}>{incident.location}, {incident.country}</h2>
      <p><b>Zone Level:</b> {incident.zone}</p>
      <p><b>Description:</b> {incident.description}</p>
      <h4>Recommended Measures (HZRF/HPAM):</h4>
      <ul>{zone.measures.map((m, i) => <li key={i}>{m}</li>)}</ul>
      {legend}
    </div>
  );
};

export default ZoneInfoPanel;
