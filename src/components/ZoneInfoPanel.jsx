import React, { useState } from 'react';
import ProposalsModal from './ProposalsModal';

const ZoneInfoPanel = ({ zone, sazActive, toggleSAZ }) => {
  const [showModal, setShowModal] = useState(false);

  if (!zone) {
    return (
      <div style={{ fontStyle: 'italic', color: '#666' }}>
        Click on a zone to view details.
      </div>
    );
  }

  const stats = {
    Red: { coverage: "15%", access: "Very limited", security: "Critical" },
    Yellow: { coverage: "45%", access: "Partial", security: "Unstable" },
    Green: { coverage: "80%", access: "Stable", security: "Improving" }
  };

  const colors = {
    Red: "#cc0000",
    Yellow: "#e6b800",
    Green: "#28a745"
  };

  const currentStats = stats[zone.level];

  return (
    <div>
      <h2 style={{ marginBottom: "0.5rem", color: colors[zone.level] }}>
        {zone.name}
      </h2>
      <p style={{ marginTop: 0, marginBottom: "1rem" }}>
        <b>Zone Type:</b> {zone.level} <br />
        <b>Coverage:</b> {currentStats.coverage} <br />
        <b>Access:</b> {currentStats.access} <br />
        <b>Security:</b> {currentStats.security}
      </p>

      {zone.level === "Red" && (
        <>
          <button
            onClick={() => toggleSAZ(zone.name)}
            style={{
              padding: "6px 12px",
              backgroundColor: sazActive ? "#999" : "#005cbf",
              color: "white",
              border: "none",
              borderRadius: "4px",
              marginBottom: "10px",
              cursor: "pointer"
            }}
          >
            {sazActive ? "Deactivate SAZ" : "Activate SAZ"}
          </button>
          <br />
          {sazActive && (
            <p style={{ color: "#005cbf", marginBottom: "1rem" }}>
              ✅ Safe Access Zone Active
            </p>
          )}
        </>
      )}

      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: "6px 12px",
          backgroundColor: "#007acc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        View International Proposals
      </button>

      {showModal && (
        <ProposalsModal
          level={zone.level}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ZoneInfoPanel;
