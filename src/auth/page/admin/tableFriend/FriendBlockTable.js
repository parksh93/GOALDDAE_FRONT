import React, { useState } from "react";
import axios from "axios";

const FriendBlock = () => {
  const [friendBlock, setfriendBlock] = useState("");

  const createTable = async (friendBlock) => {
    try {
      const encodedFriendBlock = encodeURIComponent(friendBlock);
      const response = await axios.post("/api/friend-block/create-table", null, {
        params: {
            friendBlock: encodedFriendBlock,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setfriendBlock(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(friendBlock);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
        친구차단 테이블명:
          <input type="text" value={friendBlock} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default FriendBlock;
