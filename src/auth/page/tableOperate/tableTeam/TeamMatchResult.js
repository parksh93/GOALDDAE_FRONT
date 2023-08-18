import React, { useState } from "react";
import axios from "axios";

const TeamMatchResult = () => {
  const [teamMatchResult, setTeamMatchResult] = useState("");

  const createTable = async (teamMatchResult) => {
    try {
      const encodedTeamMatchResult = encodeURIComponent(teamMatchResult);
      const response = await axios.post("/api/team-match-result/create-table", null, {
        params: {
          teamMatchResult: encodedTeamMatchResult,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setTeamMatchResult(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(teamMatchResult);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
        팀매치결과 테이블
          <input type="text" value={teamMatchResult} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default TeamMatchResult;
