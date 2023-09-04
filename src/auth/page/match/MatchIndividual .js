import React from "react";

const MatchIndividual = ({ matchList }) => {
  return (
    <ul>
      {matchList.map((match, index) => (
        <li key={index}>
          {match.name} / {match.location} / {match.time}
        </li>
      ))}
    </ul>
  );
};

export default MatchIndividual;