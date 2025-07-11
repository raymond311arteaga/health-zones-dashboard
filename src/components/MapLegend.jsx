import React from 'react';

const MapLegend = () => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '13px',
      boxShadow: '0 0 6px rgba(0,0,0,0.1)'
    }}>
      <strong>Zone Legend</strong>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0 0' }}>
        <li><span style={{ color: '#cc0000', fontWeight: 'bold' }}>■</span> Red: Emergency – mobile units + corridors</li>
        <li><span style={{ color: '#e6b800', fontWeight: 'bold' }}>■</span> Yellow: Temporary clinics + volunteers</li>
        <li><span style={{ color: '#28a745', fontWeight: 'bold' }}>■</span> Green: Hospital rehab + training</li>
      </ul>
    </div>
  );
};

export default MapLegend;
