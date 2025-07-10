import React from 'react';
import MapView from './components/MapView';

function App() {
  return (
    <div className="App">
      <header style={{ textAlign: 'center', padding: '1rem' }}>
        <img src="/sochum-logo.png" alt="SOCHUM Logo" style={{ height: '80px', marginBottom: '10px' }} />
        <h2>Afghanistan Health Zones Dashboard</h2>
        <p style={{ fontStyle: 'italic', fontSize: '14px' }}>
          Special Session – UN Third Committee (SOCHUM)
        </p>
      </header>
      <MapView />
    </div>
  );
}

export default App;
