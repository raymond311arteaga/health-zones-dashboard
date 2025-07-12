import React from 'react';

const proposals = {
  Red: [
    { country: "Germany", proposal: "Deploy AI-based telemedicine in inaccessible zones." },
    { country: "Pakistan", proposal: "Establish Red Crescent cross-border mobile units." }
  ],
  Yellow: [
    { country: "Canada", proposal: "Train local responders in trauma care protocols." },
    { country: "Brazil", proposal: "Supply modular vaccination stations." }
  ],
  Green: [
    { country: "Japan", proposal: "Fund hospital rehabilitation with WHO oversight." },
    { country: "South Korea", proposal: "Launch mental health recovery campaigns." }
  ]
};

const ProposalsModal = ({ level, onClose }) => {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)"
      }}>
        <h3 style={{ marginTop: 0 }}>International Proposals for {level} Zone</h3>
        <ul style={{ paddingLeft: "1rem" }}>
          {proposals[level].map((item, i) => (
            <li key={i} style={{ marginBottom: "0.5rem" }}>
              <b>{item.country}:</b> {item.proposal}
            </li>
          ))}
        </ul>
        <button onClick={onClose} style={{
          marginTop: "15px",
          padding: "6px 12px",
          backgroundColor: "#007acc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ProposalsModal;
