import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper ,Button } from '@mui/material';

const TeamSaveTable = () => {
    const [teamName, setTeamName] = useState('');
    const [area, setArea] = useState('');
    const [entryFee, setEntryFee] = useState('');
    const [preferredDay, setPreferredDay] = useState('');
    const [preferredTime, setPreferredTime] = useState('');
    const [averageAge, setAverageAge] = useState('');
    const [entryGender, setEntryGender] = useState('');
    const [recruiting, setRecruiting] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamData = {
        teamName,
        area,
        entryFee: parseInt(entryFee),
        preferredDay,
        preferredTime,
        averageAge: parseInt(averageAge), 
        entryGender, 
        recruiting: parseInt(recruiting) 
      };

    try {
        const response = await axios.post('/team/save', teamData);
        console.log(response);
        if (response.status === 200) {
          alert('팀 생성이 완료되었습니다.');
        }
      } catch (error) {
        console.error('팀 생성 에러:', error);
        alert('팀 생성 도중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };
  
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
                                        label="팀 이름"
                                        variant="outlined"
                                        className="input-field"
                                    />
                                    <TextField
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                        label="지역"
                                        variant="outlined"
                                    />
                                    <TextField
                                        value={entryFee}
                                        onChange={(e) => setEntryFee(e.target.value)}
                                        label="입단비"
                                        variant="outlined"
                                    />
                                    <TextField
                                        value={preferredDay}
                                        onChange={(e) => setPreferredDay(e.target.value)}
                                        label="선호 요일"
                                        variant="outlined"
                                    />
                                    <TextField
                                        value={preferredTime}
                                        onChange={(e) => setPreferredTime(e.target.value)}
                                        label="선호 시간"
                                        variant="outlined"
                                    />
                                    <TextField
                                        value={averageAge}
                                        onChange={(e) => setAverageAge(e.target.value)}
                                        label="평균 나이"
                                        variant="outlined"
                                    />
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">입단 가능 성별</FormLabel>
                                            <RadioGroup
                                                row
                                                value={entryGender}
                                                onChange={(e) => setEntryGender(e.target.value)}
                                            >
                                                <FormControlLabel value="Male" control={<Radio />} label="남성(Male)" />
                                                <FormControlLabel value="Female" control={<Radio />} label="여성(Female)" />
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
        </>
    </ThemeProvider>
    );
};

export default TeamSaveTable;
