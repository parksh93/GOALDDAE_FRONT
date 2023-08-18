import React, { useState } from "react";
import axios from "axios";

const MatchTeam = () => {
  const [matchTeamName, setMatchTeamName] = useState("");

  const createTable = async (teamMatchName) => {
    try {
      const encodedMatchTeamName = encodeURIComponent(matchTeamName);
      const response = await axios.post("/api/match-team/create-table", null, {
        params: {
            matchTeam: encodedMatchTeamName,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setMatchTeamName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(matchTeamName);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
        팀매치 테이블명:
          <input type="text" value={matchTeamName} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default MatchTeam;
