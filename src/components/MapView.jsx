import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { incidents } from './IncidentLog';
import ZoneInfoPanel from './ZoneInfoPanel';
import 'leaflet/dist/leaflet.css';

// Íconos de marcador por color
const zoneIcons = {
  Red: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/484/484167.png',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    className: 'marker-red'
  }),
  Yellow: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/484/484167.png',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    className: 'marker-yellow'
  }),
  Green: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/484/484167.png',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    className: 'marker-green'
  })
};

const MapView = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 100px)' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer center={[30, 40]} zoom={4} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
          />
          {incidents.map((incident) => (
            <Marker
              key={incident.id}
              position={incident.position}
              icon={zoneIcons[incident.zone]}
              eventHandlers={{ click: () => setSelectedIncident(incident) }}
            >
              <Popup>
                <b>{incident.country}</b><br />
                {incident.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div style={{
        width: '370px',
        padding: '1.5rem',
        backgroundColor: '#f4faff',
        borderLeft: '2px solid #c0d3e8',
        overflowY: 'auto'
      }}>
        <ZoneInfoPanel incident={selectedIncident} />
      </div>
    </div>
  );
};

export default MapView;
