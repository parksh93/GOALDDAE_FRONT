import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../userComponent/userContext/UserContext';
import NaviBar from '../main/naviBar/NaviBar';
import { Box, Chip } from '@mui/material';
import FieldImg1 from './FieldImg1.jpeg';
import { grey } from '@mui/material/colors';

const provinces = [
  "서울", "경기", "인천", "강원", "대전",
  "충남/세종", "충북", "대구","경북",
  "부산","울산","경남","광주",
  "전남","전북","제주"
  ];

const ReservationList = () => {
  const { userInfo } = useUser();
  const defaultProvince = userInfo && userInfo.preferredCity ? userInfo.preferredCity : '서울';
  const [selectedProvince, setSelectedProvince] = useState(defaultProvince);
  const [inOutWhether, setInOutWhether] = useState('');
  const [grassWhether, setGrassWhether] = useState('');
  const [fields, setFields] = useState([]);
  const [reservationDate,setReservationDate] = useState(new Date().toISOString().slice(0,10));
  const [reservationPeriod, setReservationPeriod] = useState('');

  useEffect(() => {
    if (selectedProvince) {
      axios.get('/field/reservation/list', { 
        params: {
          userId: null,
          inOutWhether,
          grassWhether,
          province : selectedProvince,
          reservationDate,
          reservationPeriod
              }
      })
        .then(response => setFields(response.data))
        .catch(error => console.error(`Error: ${error}`));
    }
    
  }, [selectedProvince, inOutWhether, grassWhether, reservationDate, reservationPeriod]);

  // 페이지 새로고침해도 지역 유지  
  useEffect(() => {
    const preferredCity = userInfo && userInfo.preferredCity ? userInfo.preferredCity : '서울';
    setSelectedProvince(preferredCity);
  }, [userInfo]);

return (
    <div> 
      <NaviBar />
        <select value={selectedProvince} onChange={e => setSelectedProvince(e.target.value)} style={{marginTop:'2%', marginLeft:'15%'}}> 
        <option value="">지역 선택</option> {provinces.map(province => <option key={province} value={province}>{province}</option> )} </select>

        {/* 일자 선택 */}
        <label>
          <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} style={{marginLeft:'1%'}}/>
        </label>

        <select value={reservationPeriod} onChange={(e) => setReservationPeriod(e.target.value)} style={{marginLeft:'1%'}}>
          <option value="">시간대 선택</option>
          <option value="오전">오전(06:00 ~ 12:00)</option>
          <option value="오후">오후(12:00 ~ 18:00)</option>
          <option value="저녁">저녁(18:00 ~ 24:00)</option>
        </select>

        <select value={inOutWhether} onChange={(e) => setInOutWhether(e.target.value)} style={{marginLeft:'1%'}}>
          <option value="">실내외 선택</option>
          <option value="실내">실내</option>
          <option value="실외">실외</option>
        </select>

      <select value={grassWhether} onChange={(e) => setGrassWhether(e.target.value)} style={{marginLeft:'1%'}}>
        <option value="">잔디 유형 선택</option>
        <option value="천연">천연 잔디</option>
        <option value="인조">인조 잔디</option>
      </select>
    
      {fields.map(field =>
      <Box key={field.id} sx={{marginLeft:'15%', borderBottom: `1px solid ${grey[500]}`}}>
        <Box sx={{marginTop:'2%', fontSize:'20px', fontWeight:'bold'}}>{field.fieldName}</Box>
        <Box sx={{fontSize:'13px', color: grey[600]}}>
          운영 시간: {field.operatingHours.split(':').slice(0, 2).join(':')} ~ {field.closingTime.split(':').slice(0, 2).join(':')}</Box>
        <Box sx={{fontSize:'13px', display: 'flex', justifyContent:'flex-start', color: grey[600]}}>
          {field.toiletStatus && <Box>화장실&middot;</Box>}
          {field.showerStatus && <Box>샤워실&middot;</Box>}
          {field.parkingStatus && <Box>주차장</Box>}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Box sx={{fontSize:'13px', color: grey[600]}}>
            <Box>장소: {field.inOutWhether}</Box>
            <Box>잔디 종류: {field.grassWhether}</Box>
            <Box>구장 크기: {field.fieldSize}</Box>
            <Box>대관비: {field.reservationFee}</Box>
          </Box>
          <img src={FieldImg1} alt="구장 이미지" style={{width:'10%', marginLeft:'57%'}}/>
        </Box>  

        {field.reservationInfo && (
          <>
            <Box sx={{marginTop:'2%', fontSize:'14px', fontWeight:'bold'}}>예약 가능</Box>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
              {field.reservationInfo.availableTimes.map(time => 
                <Box key={time} sx={{margin: '5px'}}>
                  <Chip label={time.split(':').slice(0, 2).join(':')} sx={{backgroundColor: '#2196f3', color: '#fff'}}/>
                </Box>)}
            </Box>

            {field.reservationInfo.reservedTimes.length > 0 && (
              <>
                <Box sx={{marginTop:'1%', fontSize:'14px', fontWeight:'bold'}}>예약 현황</Box>
                <Box sx={{display: 'flex', flexWrap: 'wrap', marginBottom: '20px'}}>
                  {field.reservationInfo.reservedTimes.map(time => 
                    <Box key={time} sx={{margin: '5px'}}>
                      <Chip label={time.split(':').slice(0, 2).join(':')} sx={{backgroundColor: '#f44336', color:'#fff'}} />
                    </Box>)}
                </Box>
              </>
            )}
          </>
        )}
      </Box>)}
    </div> 
  )}
export default ReservationList;