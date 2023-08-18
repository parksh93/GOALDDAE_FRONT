import React, { useState } from "react";
import axios from "axios";

const FriendAccept = () => {
  const [friendAcceptName, setFriendAcceptName] = useState("");

  const createTable = async (friendAcceptName) => {
    try {
      const encodedFriendAcceptName = encodeURIComponent(friendAcceptName);
      const response = await axios.post("/api/friend-accept/create-table", null, {
        params: {
            friendAccept: encodedFriendAcceptName,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFriendAcceptName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(friendAcceptName);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
        친구수락 테이블명:
          <input type="text" value={friendAcceptName} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default FriendAccept;
