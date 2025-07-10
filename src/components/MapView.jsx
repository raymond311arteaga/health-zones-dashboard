import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import { zonePolygons } from './ZoneData';
import { incidents } from './IncidentLog';
import SuggestionsBox from './SuggestionsBox';
import ZoneInfoPanel from './ZoneInfoPanel';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [sazStatus, setSazStatus] = useState({});
  const [selectedZone, setSelectedZone] = useState(null);

  const toggleSAZ = (zoneName) => {
    setSazStatus((prev) => ({
      ...prev,
      [zoneName]: !prev[zoneName],
    }));
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <MapContainer center={[33.94, 67.71]} zoom={6} style={{ height: "90vh", width: "100%" }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
          />

          {zonePolygons.map((zone, index) => (
            <Polygon
              key={index}
              positions={zone.coordinates}
              pathOptions={{
                color: sazStatus[zone.name] ? 'blue' : zone.color,
                weight: sazStatus[zone.name] ? 4 : 2,
              }}
              eventHandlers={{
                click: () => setSelectedZone(zone),
              }}
            />
          ))}

          {incidents.map((incident, i) => (
            <Marker key={i} position={incident.position}>
              <Popup>
                <b>HPAM Report:</b><br />
                {incident.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div style={{
        width: "300px",
        padding: "1.5rem",
        backgroundColor: "#f5f5f5",
        borderLeft: "1px solid #ddd",
        marginLeft: "5px",
        overflowY: "auto"
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
