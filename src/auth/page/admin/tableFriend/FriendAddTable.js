import React, { useState } from "react";
import axios from "axios";

const FriendAdd = () => {
  const [friendAdd, setFriendAdd] = useState("");

  const createTable = async (friendAdd) => {
    try {
      const encodedFriendAdd = encodeURIComponent(friendAdd);
      const response = await axios.post("/api/friend-add/create-table", null, {
        params: {
            friendAdd: encodedFriendAdd,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFriendAdd(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(friendAdd);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
        친구신청 테이블명:
          <input type="text" value={friendAdd} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default FriendAdd;
