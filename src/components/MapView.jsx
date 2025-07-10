import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import { zonePolygons } from './ZoneData';
import { incidents } from './IncidentLog';
import SuggestionsBox from './SuggestionsBox';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [sazStatus, setSazStatus] = useState({}); // Guarda el estado de SAZ por zona

  const toggleSAZ = (zoneName) => {
    setSazStatus((prev) => ({
      ...prev,
      [zoneName]: !prev[zoneName],
    }));
  };

  return (
    <MapContainer center={[33.94, 67.71]} zoom={6} style={{ height: "90vh", width: "100%" }}>
      {/* Mapa estilo ONU */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
      />

      {/* Polígonos de zonas */}
      {zonePolygons.map((zone, index) => (
        <Polygon
          key={index}
          positions={zone.coordinates}
          pathOptions={{
            color: sazStatus[zone.name] ? 'blue' : zone.color,
            weight: sazStatus[zone.name] ? 4 : 2,
          }}
        >
          <Popup>
            <b>{zone.name}</b><br />
            Zone Type: {zone.level}<br />
            <SuggestionsBox level={zone.level} />
            {zone.level === 'Red' && (
              <>
                <button
                  style={{
                    marginTop: '10px',
                    padding: '6px 12px',
                    backgroundColor: sazStatus[zone.name] ? '#1d72b8' : '#f44336',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleSAZ(zone.name)}
                >
                  {sazStatus[zone.name] ? 'Deactivate SAZ' : 'Activate SAZ'}
                </button>
                {sazStatus[zone.name] && (
                  <p style={{ marginTop: '5px', color: '#1d72b8' }}>
                    ✅ SAZ Active — Humanitarian access corridor protected.
                  </p>
                )}
              </>
            )}
          </Popup>
        </Polygon>
      ))}

      {/* Incidentes HPAM */}
      {incidents.map((incident, i) => (
        <Marker key={i} position={incident.position}>
          <Popup>
            <b>HPAM Report:</b><br />
            {incident.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
