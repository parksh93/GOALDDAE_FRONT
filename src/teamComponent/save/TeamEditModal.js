import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper ,Button, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Slider } from '@mui/material';
import { useUser } from '../../userComponent/userContext/UserContext';


const TeamEditModal = ({ open, onClose, teamInfo, onSubmit }) => {
    const [area, setArea] = useState(teamInfo.area !== null && teamInfo.area !== undefined ? teamInfo.area : '');
    const [entryFee, setEntryFee] = useState(teamInfo.entryFee !== null && teamInfo.entryFee !== undefined ? String(teamInfo.entryFee) : '');
    const [preferredDay, setPreferredDay] = useState(teamInfo.preferredDay !== null && teamInfo.preferredDay !== undefined ? teamInfo.preferredDay : ''); 
    const [preferredTime, setPreferredTime] = useState(teamInfo.preferredTime !== null && teamInfo.preferredTime !== undefined ? teamInfo.preferredTime : ''); 
    const [averageAgeRangeStartIndex, setAverageAgeRangeStartIndex] = useState(teamInfo.averageAge !== null && teamInfo.averageAge !== undefined ? Math.floor(teamInfo.averageAge / 10) : 0);
    const [averageAge, setAverageAge] = useState(teamInfo.averageAge !== null && teamInfo.averageAge !== undefined ? teamInfo.averageAge : 0);
    const [entryGender, setEntryGender] = useState(teamInfo.entryGender !== null && teamInfo.entryGender !== undefined ? teamInfo.entryGender : ''); 
    const [recruiting, setRecruiting] = useState(teamInfo.recruiting !== null && teamInfo.recruiting !== undefined ? teamInfo.recruiting : true); 
    const [isRecruiting, setIsRecruiting] = useState(teamInfo.recruiting !== null && teamInfo.recruiting !== undefined ? teamInfo.recruiting : true);
    const [teamIntroduce, setTeamIntroduce] = useState(teamInfo.teamIntroduce !== null && teamInfo.teamIntroduce !== undefined ? teamInfo.teamIntroduce : '');
   
    const { userInfo } = useUser();
 

  
  const isFemale = userInfo && userInfo.gender === '여성';
  const isMale = userInfo && userInfo.gender === '남성';

  const handlePreferredTimeChange = (e) => {
    // 입력값을 숫자로 변환하고 범위를 체크
    const inputValue = parseInt(e.target.value, 10);
    
    // 입력값이 빈 문자열이거나 0부터 23 사이의 숫자이며 길이가 1 또는 2인 경우에만 업데이트
    if (
      (e.target.value === '' || (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 23))
      && (e.target.value.length === 0 || e.target.value.length === 1 || e.target.value.length === 2)
    ) {
      setPreferredTime(e.target.value);
    }
  };

  const handleAverageAgeChange=(event,newValue)=>{
    setAverageAgeRangeStartIndex(newValue);
    setAverageAge(newValue*10);
  }

  const toggleRecruitment = () => {
    setIsRecruiting(!isRecruiting);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( !area || !preferredDay || !preferredTime || !entryGender) {
        alert('모든 필수 입력 필드를 채워주세요.');
        return;
      }  

    const updatedTeamInfo = {
        ...teamInfo, // 기존 팀 정보 복사
        area,
        entryFee: parseInt(entryFee),
        preferredDay,
        preferredTime,
        averageAge,
        entryGender,
        recruiting: isRecruiting,
        teamIntroduce,
    };

    axios
      .put('/team/update', updatedTeamInfo)
      .then((response) => {
        console.log('팀 정보가 성공적으로 업데이트되었습니다.', response);
        onSubmit(updatedTeamInfo); 
      })
      .catch((error) => {
        console.error('팀 정보 업데이트 중 오류 발생:', error);
      });
    onClose();
  };
  

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50', 
      },
    },
  })


  return (
    <ThemeProvider theme={theme}>
        {/* 페이지 위에 렌더링 */}
        <Dialog
            open={open}
            onClose={onClose}
            sx={{ position: 'absolute' }}
        >
            <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
          <h1>팀 수정</h1>
          <form onSubmit={handleSubmit}>
            <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '50px', width: '700px' }} elevation={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
                <FormControl sx={{ width: '32%' }}>
                  <InputLabel id="area-label">*지역</InputLabel>
                  <Select
                    labelId='area-label'
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    label="지역 선택"
                    variant="outlined"
                  >
                    <MenuItem value="서울">서울</MenuItem>
                    <MenuItem value="경기">경기</MenuItem>
                    <MenuItem value="인천">인천</MenuItem>
                    <MenuItem value="강원">강원</MenuItem>
                    <MenuItem value="대전">대전</MenuItem>
                    <MenuItem value="충남/세종">충남/세종</MenuItem>
                    <MenuItem value="충북">충북</MenuItem>
                    <MenuItem value="대구">대구</MenuItem>
                    <MenuItem value="경북">경북</MenuItem>
                    <MenuItem value="부산">부산</MenuItem>
                    <MenuItem value="울산">울산</MenuItem>
                    <MenuItem value="경남">경남</MenuItem>
                    <MenuItem value="광주">광주</MenuItem>
                    <MenuItem value="전남">전남</MenuItem>
                    <MenuItem value="전북">전북</MenuItem>
                    <MenuItem value="제주">제주</MenuItem>
                </Select>
                </FormControl>
                <TextField
                  sx={{ width: '32%' }}
                  value={entryFee}
                  onChange={(e) => setEntryFee(e.target.value)}
                  label="입단비"
                  variant="outlined"
                  inputProps={{
                    pattern: "[0-9]*",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        원
                      </InputAdornment>
                    )
                  }}
                />
                <FormControl sx={{ width: '32%' }}>
                  <InputLabel id="preferredDay-label">*선호 요일</InputLabel>
                  <Select
                    value={preferredDay}
                    onChange={(e) => setPreferredDay(e.target.value)}
                    label="선호 요일"
                    variant="outlined"
                  >
                    <MenuItem value="월요일">월요일</MenuItem>
                    <MenuItem value="화요일">화요일</MenuItem>
                    <MenuItem value="수요일">수요일</MenuItem> 
                    <MenuItem value="목요일">목요일</MenuItem>
                    <MenuItem value="금요일">금요일</MenuItem>
                    <MenuItem value="토요일">토요일</MenuItem>
                    <MenuItem value="일요일">일요일</MenuItem>
                </Select>
                </FormControl>
                <TextField
                  sx={{ width: '32%' }}
                  value={preferredTime}
                  onChange={handlePreferredTimeChange}
                  label="*선호 시간(0시~23시)"
                  variant="outlined"
                  inputProps={{
                    maxLength: 2,
                    pattern: "[0-9]*",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        시
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  sx={{ width: '32%' }}
                  value={averageAge}
                  label="*선호나이대"
                  variant="outlined"
                  inputProps={{
                    maxLength: 2,
                    pattern: "[0-9]*",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        세
                      </InputAdornment>
                    )
                  }}
                />
                <Slider
                  sx={{ width: '32%' }}
                  value={averageAgeRangeStartIndex}
                  onChange={handleAverageAgeChange}
                  aria-labelledby="continuous-slider"
                  min={0}
                  max={10}
                  step={1}
                />
                
                <FormControl component="fieldset">
                  <FormLabel component="legend">*입단 성별</FormLabel>
                  <RadioGroup
                    row
                    value={entryGender}
                    onChange={(e) => setEntryGender(e.target.value)}
                  >
                    <FormControlLabel value="남성" control={<Radio />} label="남성" disabled={isFemale} />
                    <FormControlLabel value="여성" control={<Radio />} label="여성" disabled={isMale} />
                    <FormControlLabel value="남녀 모두" control={<Radio />} label="남녀모두" />
                  </RadioGroup>
                </FormControl>
                <TextField
                    sx={{ width: '50%' }}

                    value={teamIntroduce}
                    onChange={(e) => setTeamIntroduce(e.target.value)}
                    label="팀 소개글"
                    variant="outlined"
                    multiline
                    rows={4} // 원하는 높이로 조절하세요
                    fullWidth
                    className="input-field"
                />
                <Box mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant={isRecruiting ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => setIsRecruiting(true)}
                        sx={{ marginRight: '10px',
                            '&.MuiButton-contained': {
                                color: 'white',
                            }, 
                        }}
                    >
                        모집하기
                    </Button>
                    <Button
                        variant={!isRecruiting ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => setIsRecruiting(false)}
                        sx={{
                            '&.MuiButton-contained': {
                              color: 'white',
                            },
                          }}
                    >
                        모집안하기
                    </Button>
                </Box>
                <Box mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" color="primary" type="submit" className="submit-button" style={{ color: '#fff' }}>
                    저장
                  </Button>
                </Box>
              </Box>
            </Paper>
          </form>
        </Box>
      </>
        </Dialog> 
    </ThemeProvider>
    );
};

export default TeamEditModal;