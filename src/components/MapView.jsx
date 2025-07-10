import React from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import { zonePolygons } from './ZoneData';
import { incidents } from './IncidentLog';
import SuggestionsBox from './SuggestionsBox';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  return (
    <MapContainer center={[33.94, 67.71]} zoom={6} style={{ height: "90vh", width: "100%" }}>
      <TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
/>


      {zonePolygons.map((zone, index) => (
        <Polygon
          key={index}
          positions={zone.coordinates}
          pathOptions={{ color: zone.color }}
        >
          <Popup>
            <b>{zone.name}</b><br />
            Zone Type: {zone.level}<br />
            <SuggestionsBox level={zone.level} />
          </Popup>
        </Polygon>
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
  );
};

export default MapView;
