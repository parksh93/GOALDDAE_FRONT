import React, { useState } from "react";
import axios from "axios";

const TeamMember = () => {
  const [teamMemberName, setTeamMemberName] = useState("");

  const createTable = async (TeamMemberName) => {
    try {
      const encodedTeamMemberName = encodeURIComponent(TeamMemberName);
      const response = await axios.post("/api/team-member/create-table", null, {
        params: {
          teamMember: encodedTeamMemberName,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setTeamMemberName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(teamMemberName);
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
        팀멤버 테이블 생성
          <input type="text" value={teamMemberName} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default TeamMember;
