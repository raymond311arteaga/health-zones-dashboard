import React, { useState } from 'react';
import ProposalsModal from './ProposalsModal';

const ZoneInfoPanel = ({ zone, sazActive, toggleSAZ }) => {
  const [showModal, setShowModal] = useState(false);

  if (!zone) return <div className="panel">Select a zone on the map</div>;

  const simulatedStats = {
    Red: {
      coverage: "15%",
      access: "Very limited",
      security: "Critical",
    },
    Yellow: {
      coverage: "45%",
      access: "Partial",
      security: "Unstable",
    },
    Green: {
      coverage: "80%",
      access: "Full",
      security: "Improving",
    },
  };

  const stats = simulatedStats[zone.level];

  return (
    <div className="panel">
      <h3>{zone.name}</h3>
      <p><b>Zone Type:</b> {zone.level}</p>
      <p><b>Health Coverage:</b> {stats.coverage}</p>
      <p><b>Humanitarian Access:</b> {stats.access}</p>
      <p><b>Security Level:</b> {stats.security}</p>

      {zone.level === "Red" && (
        <>
          <button onClick={() => toggleSAZ(zone.name)}>
            {sazActive ? "Deactivate SAZ" : "Activate SAZ"}
          </button>
          {sazActive && <p style={{ color: "#1d72b8" }}>✅ SAZ Active</p>}
        </>
      )}

      <button onClick={() => setShowModal(true)} style={{ marginTop: '10px' }}>
        View International Proposals
      </button>

      {showModal && (
        <ProposalsModal level={zone.level} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ZoneInfoPanel;
