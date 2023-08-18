import React, { useState } from "react";
import axios from "axios";

const FriendList = () => {
  const [friendListName, setfriendListName] = useState("");

  const createTable = async (friendListName) => {
    try {
      const encodedFriendListName = encodeURIComponent(friendListName);
      const response = await axios.post("/api/friend-list/create-table", null, {
        params: {
            friendList: encodedFriendListName,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setfriendListName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(friendListName);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
        친구목록 테이블명:
          <input type="text" value={friendListName} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default FriendList;
