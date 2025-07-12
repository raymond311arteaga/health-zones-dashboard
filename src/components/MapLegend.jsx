import React from 'react';

const MapLegend = () => (
  <div style={{
    position: 'absolute',
    bottom: 20,
    left: 20,
    background: 'white',
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
    boxShadow: '0 0 6px rgba(0,0,0,0.1)'
  }}>
    <strong>Zone Legend</strong>
    <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
      <li><span style={{ color: '#cc0000', fontWeight: 'bold' }}>■</span> Red: Collapse – trauma units, HPAM</li>
      <li><span style={{ color: '#e6b800', fontWeight: 'bold' }}>■</span> Yellow: Insecure – clinics, NGO support</li>
      <li><span style={{ color: '#28a745', fontWeight: 'bold' }}>■</span> Green: Recovery – training, vaccines</li>
    </ul>
  </div>
);

export default MapLegend;
