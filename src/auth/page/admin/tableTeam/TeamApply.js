import React, { useState } from "react";
import axios from "axios";

const TeamApply = () => {
  const [teamApply, setTeamApply] = useState("");

  const createTable = async (teamApply) => {
    try {
      const encodedTeamApply = encodeURIComponent(teamApply);
      const response = await axios.post("/api/team-apply/create-table", null, {
        params: {
          teamApply: encodedTeamApply,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setTeamApply(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(teamApply);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
        팀가입신청 테이블 생성:
          <input type="text" value={teamApply} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default TeamApply;
