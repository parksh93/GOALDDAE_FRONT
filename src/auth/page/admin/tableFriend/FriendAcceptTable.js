import React, { useState } from "react";
import axios from "axios";

const FriendAccept = () => {
  const [friendAccept, setFriendAccept] = useState("");

  const createTable = async (friendAccept) => {
    try {
      const encodedFriendAccept = encodeURIComponent(friendAccept);
      const response = await axios.post("/api/friend-accept/create-table", null, {
        params: {
            friendAccept: encodedFriendAccept,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFriendAccept(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(friendAccept);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
        친구수락 테이블명:
          <input type="text" value={friendAccept} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default FriendAccept;
