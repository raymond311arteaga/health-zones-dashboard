import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { zonePolygons } from './ZoneData';
import { incidents } from './IncidentLog';
import SuggestionsBox from './SuggestionsBox';
import ZoneInfoPanel from './ZoneInfoPanel';
import MapLegend from './MapLegend';
import 'leaflet/dist/leaflet.css';

const alertIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

const MapView = () => {
  const [sazStatus, setSazStatus] = useState({});
  const [selectedZone, setSelectedZone] = useState(null);

  const toggleSAZ = (zoneName) => {
    setSazStatus((prev) => ({ ...prev, [zoneName]: !prev[zoneName] }));
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 100px)' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer center={[33.94, 67.71]} zoom={6} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
          />

          {zonePolygons.map((zone, i) => (
            <Polygon
              key={i}
              positions={zone.coordinates}
              pathOptions={{
                color: sazStatus[zone.name] ? 'blue' : zone.color,
                weight: 2,
              }}
              eventHandlers={{
                click: () => setSelectedZone(zone),
              }}
            />
          ))}

          {incidents.map((incident, i) => (
            <Marker key={i} position={incident.position} icon={alertIcon}>
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <img src="https://flagcdn.com/w80/af.png" alt="AF" style={{ width: '60px', marginBottom: '8px' }} />
                  <p><b>HPAM Report:</b><br />{incident.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <MapLegend />
      </div>

      <div style={{
        width: '370px',
        padding: '1.5rem',
        backgroundColor: '#f4faff',
        borderLeft: '2px solid #c0d3e8',
        boxShadow: '-4px 0 12px rgba(0,0,0,0.06)',
        overflowY: 'auto'
      }}>
        <ZoneInfoPanel
          zone={selectedZone}
          sazActive={selectedZone ? sazStatus[selectedZone.name] : false}
          toggleSAZ={toggleSAZ}
        />
      </div>
    </div>
  );
};

export default MapView;
