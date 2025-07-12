import React from 'react';
import MapView from './components/MapView';
import './App.css';

function App() {
  return (
    <div className="app-body">
      <header className="app-header">
        <div className="header-left">
          <img src="/sochum-logo.png" alt="SOCHUM Logo" className="logo" />
          <div>
            <h1>Afghanistan’s Health Zones Conflict Tracker</h1>
            <p>SOCHUM: Protecting Health in Conflict Zones</p>
          </div>
        </div>
      </header>
      <MapView />
    </div>
  );
}

export default App;
