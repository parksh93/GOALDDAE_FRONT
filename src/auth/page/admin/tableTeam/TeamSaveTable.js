import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 

const TeamSaveTable = () => {
  const [teamName, setTeamName] = useState('');
  const [area, setArea] = useState('');
  const [averageAge, setAverageAge] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [entryGender, setEntryGender] = useState('');
  const [preferredDay, setPreferredDay] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [recruiting, sertRecruiting] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamData = {
      teamName,
      area,
      averageAge,
      entryFee,
      entryGender,
      preferredDay,
      preferredTime,
      recruiting
    };

    try {
      const response = await axios.post('/team/save', teamData);
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
        <div>
            <h1>팀페이지</h1>
            <form onSubmit={handleSubmit}>
                <form onSubmit={handleSubmit}>
                <div className="input-wrapper">

                <Box mb={2}>
                    <TextField
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        label="팀 이름"
                        variant="outlined"
                        className="input-field"
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        value={averageAge}
                        onChange={(e) => setAverageAge(e.target.value)}
                        label="나이대"
                        variant="outlined"
                        className="input-field"
                    />
                </Box>
                

                <Box mb={2}>
                    <TextField
                        value={entryFee}
                        onChange={(e) => setEntryFee(e.target.value)}
                        label="입단비"
                        variant="outlined"
                        className="input-field"
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        value={entryGender}
                        onChange={(e) => setEntryGender(e.target.value)}
                        label="입단 가능 성별"
                        variant="outlined"
                        className="input-field"
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        value={preferredDay}
                        onChange={(e) => setPreferredDay(e.target.value)}
                        label="선호 요일"
                        variant="outlined"
                        className="input-field"
                    />
                </Box>
                
                <Box mb={2}>
                    <TextField
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        label="선호 시간"
                        variant="outlined"
                        className="input-field"
                    />
                </Box>
            
                <Box mb={2}>
                    <TextField
                        value={recruiting}
                        onChange={(e) => sertRecruiting(e.target.value)}
                        label="모집 중 (0 or 1)"
                        variant="outlined"
                        className="input-field"
                    />
                </Box>
            </div>
                <button type="submit" className="submit-button">팀 생성</button>
                </form>
            </form>
        </div>
    </ThemeProvider>
    );
};

export default TeamSaveTable;
