import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MyPage.css";
import line from '../mypage/img/Untitled_line.png';
import icon1 from '../mypage/img/team.png'
import icon2 from '../mypage/img/gender-symbols.png';
import { formatDate } from '../../boardComponent/dateUtils';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.1)'
}));

function MatchList({ userId }) {
  const [matches, setMatches] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const matchesPerPage = 3;

  useEffect(() => {
    axios.get(`/match/my-individual/${userId}`)
      .then((response) => {
        if (!Array.isArray(response.data)) {
          console.error('Invalid match data:', response.data);
          return;
        }

        // 최신 게시물부터 정렬
        const sortedMatches = response.data.sort((a, b) => {
          const dateA = new Date(a.startTime);
          const dateB = new Date(b.startTime);
          return dateB - dateA;
        });

        setMatches(sortedMatches);
      })
      .catch((error) => {
        console.error('매치 목록을 가져오는 중 오류 발생:', error);
      });
  }, [userId]);

  const startIndex = (currentPageNumber - 1) * matchesPerPage;
  const endIndex = startIndex + matchesPerPage;
  const matchesToDisplay = matches.slice(startIndex, endIndex);

  // 현재 선택된 페이지 번호 상태
  const [selectedPage, setSelectedPage] = useState(1);

  // 페이지 번호 클릭 핸들러
  const handlePageClick = (pageNumber) => {
    setSelectedPage(pageNumber);
  };

  // 페이징 버튼을 생성
  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(matches.length / matchesPerPage);
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPageNumber(i)}
          className={i === currentPageNumber ? 'active' : ''}
          style={{
            backgroundColor: 'transparent',
            color: '#000',
            fontWeight: i === currentPageNumber ? 'bold' : 'normal',
            padding: '5px 10px',
          }}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className='user-card-match'>
      <Box sx={{ width: '100%' }}>
      <Stack>
        <div style={{ marginBottom: '40px' }}>
          {matchesToDisplay.length === 0 ? (
            <h2 className="no-matches-message" style={{ color: 'grey' }}>아직 신청한 매치가 없네요 .. 😞</h2>
          ) : (
            matchesToDisplay.map((match, index) => (
              <Item key={index} style={{ marginBottom: '40px' }}>
                <div>
                  <div className='time' style={{ flex: 1, marginLeft: '20px' }}>
                    <p>
                      <span className="start-time"> 시작 시간 {new Date(match.startTime).toLocaleString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}</span>
                      <span className="end-time"> 종료 시간 {new Date(match.endTime).toLocaleString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}</span>
                    </p>
                  </div>
                  <div className='player' style={{ flex: 1, marginTop: '30px', marginLeft: '20px' }}>
                    <span className="player-number"><img src={icon1} style={{ width: '20px', height: '20px', marginBottom: '-5px'}}/> 인원 <b>{match.playerNumber}</b>명</span>
                    <span className="match-gender"><img src={icon2} style={{ width: '20px', height: '20px', marginBottom: '-5px'}}/> 성별 <b>{match.gender}</b> </span>
                    <span className="match-level"> <Chip label={match.level} color="success" /> </span>
                  </div>
                </div>
              </Item>
            ))
          )}
        </div>
      </Stack>
    </Box>
      
      {/* 페이징 버튼 */}
      <div className="pagination" style={{ display: 'flex', justifyContent: 'center' }}>
        {renderPaginationButtons()}
      </div>
    </div>
  );
}  

export default MatchList;
