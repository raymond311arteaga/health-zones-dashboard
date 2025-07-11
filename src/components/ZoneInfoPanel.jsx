import React from 'react';

const zoneStyles = {
  Red: {
    color: '#cc0000',
    measures: [
      "Deploy trauma units",
      "Activate SAZs",
      "Enable telehealth",
      "Document via HPAM"
    ]
  },
  Yellow: {
    color: '#e6b800',
    measures: [
      "Modular clinics",
      "Train volunteers",
      "NGO coordination",
      "Early SAZ preparation"
    ]
  },
  Green: {
    color: '#28a745',
    measures: [
      "Hospital rehab",
      "Vaccination",
      "Training programs",
      "Handover protocols"
    ]
  }
};

const ZoneInfoPanel = ({ incident }) => {
  if (!incident) {
    return <div style={{ fontStyle: 'italic', color: '#666' }}>Click a marker to view info.</div>;
  }

  const zone = zoneStyles[incident.zone];

  return (
    <div>
      <h2 style={{ color: zone.color }}>{incident.location}, {incident.country}</h2>
      <p><b>Zone Level:</b> {incident.zone}</p>
      <p><b>Description:</b> {incident.description}</p>
      <h4>Recommended Measures:</h4>
      <ul>{zone.measures.map((m, i) => <li key={i}>{m}</li>)}</ul>
    </div>
  );
};

export default ZoneInfoPanel;
