import React, { useState } from "react";
import axios from "axios";

const FriendList = () => {
  const [friendList, setfriendList] = useState("");

  const createTable = async (friendList) => {
    try {
      const encodedFriendList = encodeURIComponent(friendList);
      const response = await axios.post("/api/friend-list/create-table", null, {
        params: {
            friendList: encodedFriendList,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setfriendList(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(friendList);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>
        친구목록 테이블명:
          <input type="text" value={friendList} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default FriendList;
