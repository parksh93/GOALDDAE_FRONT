import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BoardList({ userId }) {
  const [Board, setBoard] = useState([]);

  useEffect(() => {
    axios.get(`/posts/${userId}`)
      .then(response => {
        setBoard(response.data);
      })
      .catch(error => {
        console.error('에러가 발생했습니다!', error);
      });
  }, [userId]);

  return (
    <div>
      <div className='user-card-match'>
        <p><b>게시글리스트</b><text>{userId.Board}</text></p>
    </div>
    </div>
  );
}

export default BoardList;
