import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper ,Button, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Slider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../../userComponent/userContext/UserContext';

const TeamSaveTable = () => {
  const [teamName, setTeamName] = useState('');
  const [area, setArea] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [preferredDay, setPreferredDay] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [averageAgeRangeStartIndex,setAverageAgeRangeStartIndex]=useState(0);
  const [averageAge, setAverageAge] = useState(0);
  const [entryGender, setEntryGender] = useState('');
  const [recruiting, setRecruiting] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 로그인 모달
  const [isAlreadyJoinedModalOpen, setIsAlreadyJoinedModalOpen] = useState(false); // 팀 모달
  const [isAlreadyJoined, setIsAlreadyJoined] = useState(false); // 이미 팀 가입 여부 상태

  const navigate = useNavigate();
  const { userInfo } = useUser();

  useEffect(() => {
    if (!userInfo) {
      setIsLoginModalOpen(true);
    } else {
      try {
        const teamId = userInfo.teamId; // 팀 가입 여부 확인
      
        if (teamId !== null && teamId >= 0) {
          setIsAlreadyJoined(true);
          setIsAlreadyJoinedModalOpen(true);
        } else {
          setIsAlreadyJoined(false);
        }
      } catch (error){
          console.error('팀 가입 여부를 확인할 수 없습니다.:', error);
        }
    }
  }, [userInfo]);

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!teamName || !area || !preferredDay || !preferredTime || !entryGender) {
      alert('모든 필수 입력 필드를 채워주세요.');
      return;
    }

    const teamData = {
        teamName,
        area,
        entryFee: parseInt(entryFee),
        preferredDay,
        preferredTime,
        averageAge: parseInt(averageAge), 
        entryGender, 
        recruiting
      };

    try {
      console.log(teamData)
        const response = await axios.post('/team/save', teamData);
        console.log("response:", response);

        if (response.status === 200) {
          alert('팀 생성이 완료되었습니다.');

          const teamIdResponse = await axios.get('/team/getAutoIncrementTeamId')
            
            if(teamIdResponse.status === 200) {
              const newTeamId = teamIdResponse.data;
              console.log("newTeamId : ", newTeamId);

              userInfo.teamId = newTeamId;
              console.log("userInfo : ", userInfo); // 여기에서 teamId 바뀌었는지 확인
                                       
              const updateIdResponse = await axios.patch('/user/update/teamId', { id: userInfo.id,
                                                                                  teamId: newTeamId})
                if(updateIdResponse.status === 200){
                  const updatedUserTeamId = updateIdResponse.data;
                  console.log("updatedUserTeamId: ",updatedUserTeamId)

                  navigate(`/team/myTeamDetail/${updatedUserTeamId}/info`); 

                }else{
                  console.log("유저의 teamId 업데이트 실패");
                }

              const newMemberResponse = await axios.post('/teamMember/add', { userId: userInfo.id,
                                                                              teamId: newTeamId});
              console.log("newMemberResponse : ", newMemberResponse);

                if(newMemberResponse.status === 200){
                  console.log("새로운 멤버(ID:", userInfo.id, "가 추가되었습니다.");
              
                } else {
                    console.log("팀 멤버 추가 실패.");
                    alert('멤버 추가에 실패했습니다.')
                } 
         
            } else {
                console.log('teamId 업데이트 실패');
                alert('사용자 정보 업데이트 중 오류가 발생했습니다.')
            }
        } else {
          console.log('세부 기능 오류');
        }
      }catch(error) {
        console.error('팀 생성 에러:', error);
        alert('팀 생성 도중 오류가 발생했습니다. 다시 시도해주세요.');
      }
  }
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50', 
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
                <h1>팀 생성</h1>
                    <form onSubmit={handleSubmit}>
                            <Paper sx={{ display :'flex' , flexDirection :'column' , gap :2 , padding :'50px', width: '700px'}} elevation ={3}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <TextField
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                        label="*팀 이름"
                                        variant="outlined"
                                        className="input-field"
                                    />
                                    <FormControl sx={{ width: '32%' }} >
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
                                        sx={{width:'32%'}}
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
                                    <FormControl sx={{width:'32%'}}>
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
                                        sx={{width:'32%'}}
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
                                        sx={{width:'32%'}}
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
                                                <FormControlLabel value="남성" control={<Radio />} 
                                                                  label="남성" disabled={isFemale} />
                                                <FormControlLabel value="여성" control={<Radio />} 
                                                                  label="여성" disabled={isMale} />
                                                <FormControlLabel value="남녀 모두" control={<Radio />} label="남녀모두" />
                                            </RadioGroup>
                                    </FormControl>
                                    <Box mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="contained" color="primary" type="submit" className="submit-button" style={{ color: '#fff' }}>
                                        생성
                                    </Button>
                                    </Box>
                                </Box>
                            </Paper>
                    </form>
            </Box>

            <Dialog open={isLoginModalOpen && !userInfo} onClose={() => setIsLoginModalOpen(false)}>
                <DialogTitle>로그인 필요</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                            navigate('/team/list');}} 
                            color="primary">
                        취소
                    </Button>
                    <Button onClick={() => {
                        setIsLoginModalOpen(false);
                        navigate('/login');
                    }} color="primary">
                        로그인
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isAlreadyJoinedModalOpen} onClose={() => { setIsAlreadyJoinedModalOpen(false);  navigate('/team/list');}}>
              <DialogTitle>팀 생성 오류</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  이미 가입된 팀이 있습니다.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => { navigate('/team/list');}} color="primary">
                  확인
                </Button>
              </DialogActions>
            </Dialog>


        </>
    </ThemeProvider>
    );
};

export default TeamSaveTable;