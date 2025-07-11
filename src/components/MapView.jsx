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
    <div style={{
      display: "flex",
      height: "calc(100vh - 140px)",
      margin: "0 2rem 2rem 2rem",
      boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
      borderRadius: "10px",
      overflow: "hidden"
    }}>
      <div style={{ flex: 1 }}>
        <MapContainer center={[33.94, 67.71]} zoom={6} style={{ height: "100%", width: "100%" }}>
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
  width: "360px",
  padding: "2rem",
  backgroundColor: "#f4faff", // azul muy claro tipo ONU
  borderLeft: "2px solid #c0d3e8",
  boxShadow: "-4px 0 12px rgba(0,0,0,0.06)",
  fontFamily: "Segoe UI, Roboto, Arial, sans-serif",
  fontSize: "15px",
  lineHeight: "1.5",
  color: "#2a2a2a",
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
