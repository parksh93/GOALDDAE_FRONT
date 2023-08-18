import React, { useState } from "react";
import axios from "axios";

const TeamApply = () => {
  const [teamApplyName, setTeamApplyName] = useState("");

  const createTable = async (teamApplyName) => {
    try {
      const encodedTeamApplyName = encodeURIComponent(teamApplyName);
      const response = await axios.post("/api/team-apply/create-table", null, {
        params: {
          teamApply: encodedTeamApplyName,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setTeamApplyName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(teamApplyName);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
        팀가입신청 테이블 생성
          <input type="text" value={teamApplyName} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default TeamApply;
