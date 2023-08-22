import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './SoccerFieldTable.css'; 

const SoccerFieldTable = () => {
  const [id, setId] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [toiletStatus, setToiletStatus] = useState('');
  const [showerStatus, setShowerStatus] = useState('');
  const [parkingStatus, setParkingStatus] = useState('');
  const [requirements, setRequirements] = useState('');
  const [fieldSize, setFieldSize] = useState('');
  const [fieldImg1, setFieldImg1] = useState('');
  const [fieldImg2, setFieldImg2] = useState('');
  const [fieldImg3, setFieldImg3] = useState('');
  const [reservationFree, setReservationFree] = useState('');
  const [inOutWhether, setInOutWhether] = useState('');
  const [grassWhether, setGrassWhether] = useState('');
  const [region, setRegion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 입력값 검증
    if (!id || !fieldName || !toiletStatus || !showerStatus || !parkingStatus || !requirements || !fieldSize || !fieldImg1 || !fieldImg2 || !fieldImg3 || !reservationFree || !inOutWhether || !grassWhether || !region) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }
  
    try {
      const soccerField = {
        id: id,
        fieldName: fieldName,
        toiletStatus: toiletStatus,
        showerStatus: showerStatus,
        parkingStatus: parkingStatus,
        requirements: requirements,
        fieldSize: fieldSize,
        fieldImg1: fieldImg1,
        fieldImg2: fieldImg2,
        fieldImg3: fieldImg3,
        reservationFree: reservationFree,
        inOutWhether: inOutWhether,
        grassWhether: grassWhether, 
        region: region,
      };
      const response = await axios.post('/addSoccerField', soccerField);
  
      if (response.status === 200) { // 요청이 성공적으로 완료되었을 경우
        console.log(`생성 완료: ${fieldName}`);
      } else { // 그 외 상태 코드일 경우, 생성이 실패한 것으로 간주함
        console.error(`생성 실패, 상태 코드: ${response.status}`);
        alert('구장 추가에 실패했습니다.');
      }
    } catch (error) { // 응답에 에러가 발생한 경우
      console.error('구장 추가 중 에러 발생:', error);
      alert('구장 추가에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <h3>구장 등록</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      
      <div className="input-wrapper">
      <Box mb={2}>
        <TextField
          value={id}
          onChange={(e) => setId(e.target.value)}
          label="구장PK ID(Number)"
          variant="outlined"
          className="input-field"
        />
      </Box>
      <Box mb={2}>
        <TextField
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          label="구장 이름"
          variant="outlined"
          className="input-field"
        />
      </Box>
      <Box mb={2}>
        <TextField
          value={toiletStatus}
          onChange={(e) => setToiletStatus(e.target.value)}
          label="화장실 여부(true or false)"
          variant="outlined"
          className="input-field"
        />
      </Box>
      <Box mb={2}>
        <TextField
          value={showerStatus}
          onChange={(e) => setShowerStatus(e.target.value)}
          label="샤워시설 여부(true or false)"
          variant="outlined"
          className="input-field"
        />
      </Box>
      <Box mb={2}>
        <TextField
          value={parkingStatus}
          onChange={(e) => setParkingStatus(e.target.value)}
          label="주차장 여부(true or false)"
          variant="outlined"
          className="input-field"
        />
      </Box>
      <Box mb={2}>
        <TextField
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          label="요구사항"
          variant="outlined"
          className="input-field"
        />
      </Box>
      <Box mb={2}>
        <TextField
          value={fieldSize}
          onChange={(e) => setFieldSize(e.target.value)}
          label="구장 크기"
          variant="outlined"
          className="input-field"
        />
      </Box>
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
      <Box mb={2}>
        <TextField
          value={reservationFree}
          onChange={(e) => setReservationFree(e.target.value)}
          label="예약 가능 여부(0 or 1)"
          variant="outlined"
          className="input-field"
        />
      </Box>
      <Box mb={2}>
        <TextField
          value={inOutWhether}
          onChange={(e) => setInOutWhether(e.target.value)}
          label="실내/실외 여부(0 or 1)"
          variant="outlined"
          className="input-field"
        />
      </Box>
      <Box mb={2}>
        <TextField
          value={grassWhether}
          onChange={(e) => setGrassWhether(e.target.value)}
          label="잔디 여부(0 or 1)"
          variant="outlined"
          className="input-field"
        />
      </Box>
      <Box mb={2}>
        <TextField
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          label="지역"
          variant="outlined"
          className="input-field"
        />
      </Box>
      </div>

      <div className="buttons-container">
        <button type="submit" className="submit-button">추가</button>
      </div>
      </form>
    </div>
  );
};

export default SoccerFieldTable;