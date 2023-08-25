import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SoccerFieldTable.css';

const SoccerFieldTable = () => {
  const [fieldName, setFieldName] = useState('');
  const [toiletStatus, setToiletStatus] = useState(0);
  const [showerStatus, setShowerStatus] = useState(0);
  const [parkingStatus, setParkingStatus] = useState(undefined);
  const [fieldSize, setFieldSize] = useState('');
  const [fieldImg1, setFieldImg1] = useState('');
  const [fieldImg2, setFieldImg2] = useState('');
  const [fieldImg3, setFieldImg3] = useState('');
  const [reservationFee, setReservationFee] = useState('');
  const [inOutWhether, setInOutWhether] = useState(undefined);
  const [grassWhether, setGrassWhether] = useState(undefined);
  const [region, setRegion] = useState('');

  const [fieldImg1Preview, setFieldImg1Preview] = useState(null);
  const [fieldImg2Preview, setFieldImg2Preview] = useState(null);
  const [fieldImg3Preview, setFieldImg3Preview] = useState(null);

  const handleFileChange = (e, setter, previewSetter) => {
    const file = e.target.files[0];
    setter(file);
  
    const reader = new FileReader();
    reader.onloadend = () => {
      previewSetter(reader.result);
    };
    
    if (file) {
      reader.readAsDataURL(file);
    } else {
      previewSetter(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const soccerField = {
        fieldName: fieldName,
        toiletStatus: toiletStatus,
        showerStatus: showerStatus,
        parkingStatus: parkingStatus,
        fieldSize: fieldSize,
        fieldImg1: fieldImg1,
        fieldImg2: fieldImg2,
        fieldImg3: fieldImg3,
        reservationFee: reservationFee,
        inOutWhether: inOutWhether,
        grassWhether: grassWhether, 
        region: region,
      };

      const response = await axios.post('/soccerField/save', soccerField);
  
      if (response.status === 200) { 
        console.log(`생성 완료: ${fieldName}`);
      } else { 
        console.error(`생성 실패, 상태 코드: ${response.status}`);
        alert('구장 추가에 실패했습니다.');
      }
    } catch (error) { 
      console.error('구장 추가 중 에러 발생:', error);
      alert('구장 추가에 실패했습니다. 다시 시도해주세요.');
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
      <h1 style={{ textAlign: 'center' }}>구장 등록</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center'}}>
            <div className="required-box" style={{ display: 'flex', flexDirection: 'column'}}>
              <div className="required-label">필수 입력</div>
              <Box mb={2}>
                <TextField
                  value={fieldName}
                  onChange={(e) =>setFieldName(e.target.value)}
                  label="구장 이름"
                  variant="outlined"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  label="지역"
                  variant="outlined"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  value={fieldSize}
                  onChange={(e) => setFieldSize(e.target.value)}
                  label="구장 크기"
                  variant="outlined"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  value={reservationFee}
                  onChange={(e) => setReservationFee(e.target.value)}
                  label="대관비"
                  variant="outlined"
                />
              </Box>
          </div>

          <div className="required-box" style={{ display: 'flex', flexDirection: 'column'}}>
              <div className="required-label">필수 선택</div>
            <Box mb={2}>
              <FormControl component="fieldset">
                <FormLabel component="legend">실내/실외</FormLabel>
                <RadioGroup
                  row
                  aria-label="inOutWhether"
                  name="inout-whether"
                  value={inOutWhether}
                  onChange={(e) => setInOutWhether(parseInt(e.target.value))}
                >
                  <FormControlLabel value={1} control={<Radio />} label="실내" />
                  <FormControlLabel value={0} control={<Radio />} label="실외" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl component="fieldset">
                <FormLabel component="legend">잔디 종류</FormLabel>
                <RadioGroup
                  row
                  aria-label="grassWhether"
                  name="grass-whether"
                  value={grassWhether}
                  onChange={(e) => setGrassWhether(parseInt(e.target.value))}
                >
                  <FormControlLabel value={1} control={<Radio />} label="천연" />
                  <FormControlLabel value={0} control={<Radio />} label="인조" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl component="fieldset">
                <FormLabel component="legend">화장실 여부</FormLabel>
                <RadioGroup
                  row
                  aria-label="toiletStatus"
                  name="toilet-status"
                  value={toiletStatus}
                  onChange={(e) => setToiletStatus(parseInt(e.target.value))}
                >
                  <FormControlLabel value={1} control={<Radio />} label="있음" />
                  <FormControlLabel value={0} control={<Radio />} label="없음" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl component="fieldset">
                <FormLabel component="legend">샤워시설 여부</FormLabel>
                <RadioGroup
                  row
                  aria-label="showerStatus"
                  name="shower-status"
                  value={showerStatus}
                  onChange={(e) => setShowerStatus(parseInt(e.target.value))}
                >
                  <FormControlLabel value={1} control={<Radio />} label="있음" />
                  <FormControlLabel value={0} control={<Radio />} label="없음" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl component="fieldset">
                <FormLabel component="legend">주차장 여부</FormLabel>
                <RadioGroup
                  row
                  aria-label="parkingStatus"
                  name="parking-status"
                  value={parkingStatus}
                  onChange={(e) => setParkingStatus(parseInt(e.target.value))}
                >
                  <FormControlLabel value={1} control={<Radio />} label="있음" />
                  <FormControlLabel value={0} control={<Radio />} label="없음" />
                </RadioGroup>
              </FormControl>
            </Box>
            </div>
            <div className="required-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
              <div className="required-label">이미지 업로드(테스트중)</div>
                <Box mb={2}>
                   <label htmlFor="fieldImg1">구장 이미지1 </label>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, setFieldImg1, setFieldImg1Preview)}
                      className="input-field"
                    />
                    {fieldImg1 && <img src={fieldImg1Preview} alt="" className="preview-image" />}
                </Box>
                <Box mb={2}>
                  <label htmlFor="fieldImg1">구장 이미지2 </label>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, setFieldImg2, setFieldImg2Preview)}
                      className="input-field"
                    />
                      {fieldImg2 && <img src={fieldImg2Preview} alt="" className="preview-image" />}
                </Box>
                <Box mb={2}>
                  <label htmlFor="fieldImg1">구장 이미지3 </label>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, setFieldImg3, setFieldImg3Preview)}
                      className="input-field"
                    />
                      {fieldImg3 && <img src={fieldImg3Preview} alt="" className="preview-image" />}
                </Box>
            </div>
                <div className="form-container">
                  <button type="submit" className="submit-button">추가</button>
                </div>
          </form>
      </ThemeProvider>
  );  
};

export default SoccerFieldTable;