import React, { useState } from "react";
import axios from "axios";

const MatchIndividual = () => {
  const [matchIndividual, setMatchIndividual] = useState("");

  const createTable = async (matchIndividual) => {
    try {
      const encodedMatchIndividual = encodeURIComponent(matchIndividual);
      const response = await axios.post("/api/match-individual/create-table", null, {
        params: {
          matchIndividual: encodedMatchIndividual,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setMatchIndividual(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(matchIndividual);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
        개인매치 테이블 생성
          <input type="text" value={matchIndividual} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default MatchIndividual;
