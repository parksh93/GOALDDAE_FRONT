import React, { useState } from "react";
import axios from "axios";

const FriendAdd = () => {
  const [friendAddName, setFriendAddName] = useState("");

  const createTable = async (friendAddName) => {
    try {
      const encodedFriendAddName = encodeURIComponent(friendAddName);
      const response = await axios.post("/api/friend-add/create-table", null, {
        params: {
            friendAdd: encodedFriendAddName,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFriendAddName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(friendAddName);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
        친구신청 테이블명:
          <input type="text" value={friendAddName} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default FriendAdd;
