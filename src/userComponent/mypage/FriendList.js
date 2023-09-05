import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FriendList({ userId }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get(`/api/match-individual/${userId}`)
      .then(response => {
        setFriends(response.data);
      })
      .catch(error => {
        console.error('에러가 발생했습니다!', error);
      });
  }, [userId]);

  return (
    <div>
      <div className='user-card-friends'>
        <p><b>친구리스트</b></p>
        {/* <text>{userId.friends}</text> */}
    </div>
    </div>
  );
}

export default FriendList;
