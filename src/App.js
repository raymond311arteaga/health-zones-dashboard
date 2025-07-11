import React from 'react';
import MapView from './components/MapView';

function App() {
  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f0f2f5' }}>
      <header style={{
        padding: "1.2rem 2rem",
        backgroundColor: "#005cbf",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/sochum-logo.png" alt="SOCHUM Logo" style={{ height: "50px", marginRight: "15px" }} />
          <div>
            <h1 style={{ margin: 0, fontSize: "22px" }}>Afghanistan Health Zones Dashboard</h1>
            <p style={{ margin: 0, fontSize: "14px", fontStyle: "italic" }}>
              Special Session – UN Third Committee (SOCHUM)
            </p>
          </div>
        </div>
      </header>

      <MapView />
    </div>
  );
}

export default App;
