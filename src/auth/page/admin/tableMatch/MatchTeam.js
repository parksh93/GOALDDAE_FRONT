import React, { useState } from "react";
import axios from "axios";

const MatchTeam = () => {
  const [matchTeam, setmatchTeam] = useState("");

  const createTable = async (matchTeam) => {
    try {
      const encodedMatchTeam = encodeURIComponent(matchTeam);
      const response = await axios.post("/api/match-team/create-table", null, {
        params: {
          matchTeam: encodedMatchTeam,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setmatchTeam(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(matchTeam);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
        팀매치 테이블 생성:
          <input type="text" value={matchTeam} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default MatchTeam;
