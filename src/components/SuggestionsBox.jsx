import React from 'react';

const SuggestionsBox = ({ level }) => {
  const suggestions = {
    Red: [
      "Deploy mobile trauma units and telehealth services.",
      "Activate Safe Access Zones for emergency corridors."
    ],
    Yellow: [
      "Install modular clinics and train local brigades.",
      "Coordinate with NGOs for culturally sensitive care."
    ],
    Green: [
      "Rehabilitate permanent hospitals and launch training programs.",
      "Support vaccination and education campaigns."
    ]
  };

  return (
    <div>
      <b>Suggested Solutions:</b>
      <ul>
        {suggestions[level].map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsBox;
