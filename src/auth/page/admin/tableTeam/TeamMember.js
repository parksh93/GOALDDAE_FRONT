import React, { useState } from "react";
import axios from "axios";

const TeamMember = () => {
  const [teamMember, setTeamMember] = useState("");

  const createTable = async (TeamMember) => {
    try {
      const encodedTeamMember = encodeURIComponent(TeamMember);
      const response = await axios.post("/api/team-member/create-table", null, {
        params: {
          teamMember: encodedTeamMember,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setTeamMember(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(teamMember);
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
        팀멤버 테이블 생성:
          <input type="text" value={teamMember} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default TeamMember;
