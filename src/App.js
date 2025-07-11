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
            <h1>Afghanistan Health Zones Dashboard</h1>
            <p>Special Session – UN Third Committee (SOCHUM)</p>
          </div>
        </div>
      </header>
      <MapView />
    </div>
  );
}

export default App;
