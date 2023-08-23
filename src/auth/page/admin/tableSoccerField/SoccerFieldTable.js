import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './SoccerFieldTable.css'; 

const SoccerFieldTable = () => {
  const [fieldName, setFieldName] = useState('');
  const [toiletStatus, setToiletStatus] = useState('');
  const [showerStatus, setShowerStatus] = useState('');
  const [parkingStatus, setParkingStatus] = useState('');
  const [requirements, setRequirements] = useState('');
  const [fieldSize, setFieldSize] = useState('');
  const [fieldImg1, setFieldImg1] = useState('');
  const [fieldImg2, setFieldImg2] = useState('');
  const [fieldImg3, setFieldImg3] = useState('');
  const [reservationFee, setReservationFee] = useState('');
  const [inOutWhether, setInOutWhether] = useState('');
  const [grassWhether, setGrassWhether] = useState('');
  const [region, setRegion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!fieldName || !toiletStatus || !showerStatus || !parkingStatus || !requirements || !fieldSize || !fieldImg1 || !fieldImg2 || !fieldImg3 || !reservationFee || !inOutWhether || !grassWhether || !region) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }
  
    try {
      const soccerField = {
        fieldName: fieldName,
        toiletStatus: toiletStatus,
        showerStatus: showerStatus,
        parkingStatus: parkingStatus,
        requirements: requirements,
        fieldSize: fieldSize,
        fieldImg1: fieldImg1,
        fieldImg2: fieldImg2,
        fieldImg3: fieldImg3,
        reservationFee: reservationFee,
        inOutWhether: inOutWhether,
        grassWhether: grassWhether, 
        region: region,
      };
      const response = await axios.post('/SoccerField/save', soccerField);
  
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ textAlign: 'center' }}>구장 등록</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width:'100%' }}>
      
      <div className="input-wrapper">
      
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
          value={reservationFee}
          onChange={(e) => setReservationFee(e.target.value)}
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
  );
};

export default SoccerFieldTable;