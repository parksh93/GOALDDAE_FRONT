import React, { useState } from "react";
import axios from "axios";

const FriendBlock = () => {
  const [friendBlockName, setfriendBlockName] = useState("");

  const createTable = async (friendBlockName) => {
    try {
      const encodedFriendBlockName = encodeURIComponent(friendBlockName);
      const response = await axios.post("/api/friend-block/create-table", null, {
        params: {
            friendBlock: encodedFriendBlockName,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setfriendBlockName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(friendBlockName);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
        친구차단 테이블명:
          <input type="text" value={friendBlockName} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default FriendBlock;
