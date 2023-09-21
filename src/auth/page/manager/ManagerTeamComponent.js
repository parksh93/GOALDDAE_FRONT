import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Collapse, Alert, TextField } from '@mui/material';
import styles from './Manager.module.css';
import { useNavigate } from 'react-router-dom';

function ManagerTeamComponent({ managerId }) {
  const [matchList, setMatchList] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchTeamInfo, setMatchTeamInfo] = useState(null);

  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // 초기 매치 목록을 불러옵니다.
    const getMatches = async () => {
      try {
        const response = await axios.get(`/manager/finished-team-matches?managerId=${managerId}`);
        setMatchList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
        navigate("/");
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

    setHomeScore(0);
    setAwayScore(0);

    // 선택한 매치에 참가한 팀 정보를 불러옵니다.
    try {
      const response = await axios.get(`/manager/matchTeamInfo?matchId=${matchId}`);
      setMatchTeamInfo(response.data);
      setSelectedMatch(matchId);
    } catch (error) {
      console.error('Error fetching match info:', error);
    }
  };


  const handleAddTeamMatchResult = async () => {

        const resultData = {
            matchId : selectedMatch,
            homeTeamId : matchTeamInfo.homeTeamId,
            awayTeamId : matchTeamInfo.awayTeamId,
            homeScore : homeScore,
            awayScore : awayScore,
        }
        
    
        try {
          const response = await axios.post('/manager/addTeamMatchResult', resultData);
          console.log('팀매치 정보 등록이 완료되었습니다.', response.data);
          setSelectedMatch(null);
          setHomeScore(0);
          setAwayScore(0);
          setOpen(true);
          setAlertSeverity("success");
          setAlertMsg("팀매치 정보 등록이 완료되었습니다.");
        } catch (error) {
          console.error('팀매치 정보 등록 중 오류 발생:', error);
          // 오류 처리 로직 추가
        }

  };

  return (
    <div>
        <Collapse in={open}>
        <Alert severity={alertSeverity}>
            {alertMsg}
        </Alert>
        </Collapse>
      <div>
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
          <h2>참가 팀 정보</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>홈팀 ID</TableCell>
                  <TableCell>홈팀명</TableCell>
                  <TableCell>원정팀 ID</TableCell>
                  <TableCell>원정팀명</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matchTeamInfo && 
                <>
                    <TableRow>
                        <TableCell>{matchTeamInfo.homeTeamId}</TableCell>
                        <TableCell>{matchTeamInfo.homeTeamName}</TableCell>
                        <TableCell>{matchTeamInfo.awayTeamId}</TableCell>
                        <TableCell>{matchTeamInfo.awayTeamName}</TableCell>
                    </TableRow>                
                    <TableRow>
                        <TableCell>점수</TableCell>
                        <TableCell>
                            <TextField id="outlined-basic" type="number" InputLabelProps={{ shrink: true,}} variant="outlined" size="small" sx={{width : "100px"}} 
                            value={homeScore} onChange={(e) => e.target.value > -1 ? setHomeScore(e.target.value) : setHomeScore(0)}/>
                        </TableCell>
                        <TableCell>점수</TableCell>
                        <TableCell>
                            <TextField id="outlined-basic" type="number" InputLabelProps={{ shrink: true,}} variant="outlined" size="small" sx={{width : "100px"}} 
                            value={awayScore} onChange={(e) => e.target.value > -1 ? setAwayScore(e.target.value) : setAwayScore(0)}/>
                        </TableCell>
                    </TableRow>                
                </>
                }
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" onClick={handleAddTeamMatchResult} fullWidth color="inherit">팀매치 결과 등록</Button>
        </div>
      )}
    </div>
  );
}

export default ManagerTeamComponent;
