import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MatchList({ userId }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get(`/api/match-individual/${userId}`)
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
        <p><b>매치리스트</b><text>{userId.matches}</text></p>
    </div>
    </div>
  );
}

export default MatchList;
