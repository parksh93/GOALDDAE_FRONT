import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MatchList({ userId }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get(`/user/match-individual/${userId}`)
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.error('에러가 발생했습니다!', error);
      });
  }, [userId]);

  return (
    <div>
      <div className='user-card-match'>
        {/* <text>{userId.matches}</text> */}
    </div>
    </div>
  );
}

export default MatchList;
