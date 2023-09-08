import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MyPage.css";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import line from '../mypage/img/Untitled_line.png';



function MatchList({ userId }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get(`/match/my-individual/${userId}`)
      .then(response => {
        console.log('Server response:', response);

        try {
          // const data = JSON.parse(jsonString);
          const data = response.data;
          console.log('Parsed data:', data);

          if (Array.isArray(data)) {
            setMatches(data);
          } else {
            console.error('변환된 데이터가 배열이 아닙니다:', data);
          }
        } catch (error) {
          console.error(`JSON.parse() 호출 중 오류 발생. 유효하지 않은 JSON 문자열일 가능성이 있습니다: ${error}\n원본 문자열: `);
        }
      })
      .catch(error => {
        console.error('에러가 발생했습니다!', error);
      });
  }, [userId]);


  return (
    <div className='user-card-match'>
      {matches.map((match, index) => (
        <div key={index}>

          <div className='time' style={{ flex: 1, marginLeft: '20px'  }}>
          <p>
          <span className="start-time"> 시작 시간 {new Date(match.startTime).toLocaleString()}</span>
          <span className="end-time"> 종료 시간 {new Date(match.endTime).toLocaleString()}</span>
          </p>
          </div>

          <div className='player' style={{ flex: 1, marginTop: '30px', marginLeft: '20px' }}>
          <span className="player-number"> 인원 <b>{match.playerNumber}</b>명</span>
          <span className="match-gender"> 성별 <b>{match.gender}</b> </span>
          <span className="match-level"> <Chip label={match.level} color="success" /> </span>
          </div>

          <p><img src={line}></img></p>

        </div>
      ))}
    </div>
  );
}

export default MatchList;
