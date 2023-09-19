import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import styles from './Manager.module.css';

function ManagerComponent({ managerId }) {
  const [matchList, setMatchList] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [matchParticipants, setMatchParticipants] = useState([]);

  useEffect(() => {
    // 초기 매치 목록을 불러옵니다.
    const getMatches = async () => {
      try {
        const response = await axios.get(`/manager/finished-matches?managerId=${managerId}`);
        setMatchList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    getMatches();
  }, [managerId]);

  const formatDate = (datetime) => {
    const options = { month: 'numeric', day: 'numeric', hour: 'numeric' };
    const formattedDate = new Date(datetime).toLocaleString('ko-KR', options);

    return formattedDate;
  }

  const handleMatchClick = async (matchId) => {
    if (selectedMatch === matchId) {
      setSelectedMatch(null);
      return;
    }

    setSelectedUserIds([]);

    // 선택한 매치에 참가한 유저 정보를 불러옵니다.
    try {
      const response = await axios.get(`/manager/matchParticipants?matchId=${matchId}`);
      setMatchParticipants(response.data);
      console.log(response.data);
      setSelectedMatch(matchId);
    } catch (error) {
      console.error('Error fetching match participants:', error);
    }
  };

  const handleUserSelect = (userId) => {
    // 선택한 유저 아이디를 배열에 추가 또는 제거합니다.
    const isSelected = selectedUserIds.includes(userId);
    if (isSelected) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  const handleNoShowCountIncrease = async () => {
    // 선택한 유저 아이디 목록을 이용하여 /manager/increaseNoShowCount에 요청을 보냅니다.
    try {
      const response = await axios.post('/manager/increaseNoShowCount', selectedUserIds);
      console.log('노쇼 횟수가 증가되었습니다.', response.data);
      // 필요한 추가 동작 수행
    } catch (error) {
      console.error('노쇼 횟수 증가 중 오류 발생:', error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <div className={styles.managerContainer}>
      <h1>매치결과 관리</h1>
      <div>
        <h2>매치 목록</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>구장명</TableCell>
                <TableCell>시작시간</TableCell>
                <TableCell>인원수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matchList.map((match) => (
                <TableRow
                  key={match.id}
                  onClick={() => handleMatchClick(match.id)}
                  sx={{background : match.id === selectedMatch ? "#E5E5E5" : ""}}
                >
                  <TableCell>{match.id}</TableCell>
                  <TableCell>{match.fieldName}</TableCell>
                  <TableCell>{formatDate(match.startTime)}</TableCell>
                  <TableCell>{match.playerNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {selectedMatch && (
        <div>
          <h2>신청 유저 목록</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>닉네임</TableCell>
                  <TableCell>성별</TableCell>
                  <TableCell>전화번호</TableCell>
                  <TableCell>노쇼횟수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matchParticipants.map((user) => (
                  <TableRow
                    key={user.id}
                    onClick={() => handleUserSelect(user.id)}
                    sx={{background : selectedUserIds.includes(user.id) ? "#E5E5E5" : ""}}
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.nickname}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.noShowCnt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" onClick={handleNoShowCountIncrease} fullWidth color='success'>미참여 유저 등록</Button>
        </div>
      )}
    </div>
  );
}

export default ManagerComponent;
