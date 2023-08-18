import React, { useState } from "react";
import axios from "axios";

const MatchIndividual = () => {
  const [matchIndividualName, setMatchIndividualName] = useState("");

  const createTable = async (matchIndividualName) => {
    try {
      const encodedMatchIndividualName = encodeURIComponent(matchIndividualName);
      const response = await axios.post("/api/match-individual/create-table", null, {
        params: {
          matchIndividual: encodedMatchIndividualName,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setMatchIndividualName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(matchIndividualName);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
        개인매치 테이블명:
          <input type="text" value={matchIndividualName} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default MatchIndividual;
