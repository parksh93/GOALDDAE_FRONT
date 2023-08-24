import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';
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
  const [reservationFee, setReservationFee] = useState(0);
  const [inOutWhether, setInOutWhether] = useState(undefined);
  const [grassWhether, setGrassWhether] = useState(undefined);
  const [region, setRegion] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>구장 등록</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width:'100%' }}>
            <div className="required-box1">
              <div className="required-label">필수 입력</div>
              <Box mb={2}>
                <TextField
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  label="구장 이름"
                  variant="outlined"
                  className={`input-field required-field custom-focus-input ${isFocused ? 'focus-clicked' : ''}`}
                  InputLabelProps={{
                    classes: {
                      focused: "custom-focus-input",
                    },
                  }}
                  InputProps={{
                    classes: {
                      notchedOutline: "custom-focus-input",
                      focused: "custom-focus-input",
                    },
                  }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  label="지역"
                  variant="outlined"
                  className="input-field required-field"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  value={fieldSize}
                  onChange={(e) => setFieldSize(e.target.value)}
                  label="구장 크기"
                  variant="outlined"
                  className="input-field required-field"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  value={reservationFee}
                  onChange={(e) => setReservationFee(e.target.value)}
                  label="대관비"
                  variant="outlined"
                  className="input-field required-field"
                />
              </Box>
          </div>

          <div className="required-box2">
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

            <div className="required-box2">
              <div className="required-label">이미지 첨부</div>
            <Box mb={2}>
              <TextField
                value={fieldImg1}
                onChange={(e) => setFieldImg1(e.target.value)}
                label="구장 이미지 1"
                variant="outlined"
                className="input-field"
              />
            </Box>
            <Box mb={2}>
              <TextField
                value={fieldImg2}
                onChange={(e) => setFieldImg2(e.target.value)}
                label="구장 이미지 2"
                variant="outlined"
                className="input-field"
              />
            </Box>
            <Box mb={2}>
              <TextField
                value={fieldImg3}
                onChange={(e) => setFieldImg3(e.target.value)}
                label="구장 이미지 3"
                variant="outlined"
                className="input-field"
              />
            </Box>
            </div>
          <div 
              style={{ 
              display: 'flex', 
              justifyContent: 'center',
              marginRight: '180px'
              }}>
                <button type="submit" className="submit-button">추가</button>
            </div>
          </form>
        </div>
    </>
  );
};

export default SoccerFieldTable;