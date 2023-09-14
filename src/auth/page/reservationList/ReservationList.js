import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../userComponent/userContext/UserContext';
import NaviBar from '../main/naviBar/NaviBar';

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
        <select value={selectedProvince} onChange={e => setSelectedProvince(e.target.value)}> 
        <option value="">지역 선택</option> {provinces.map(province => <option key={province} value={province}>{province}</option> )} </select>
        
        <label>
          예약일:
          <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
        </label>

        <select value={reservationPeriod} onChange={(e) => setReservationPeriod(e.target.value)}>
          <option value="">시간대 선택</option>
          <option value="오전">오전(06:00 ~ 12:00)</option>
          <option value="오후">오후(12:00 ~ 18:00)</option>
          <option value="저녁">저녁(18:00 ~ 24:00)</option>
        </select>

        <select value={inOutWhether} onChange={(e) => setInOutWhether(e.target.value)}>
          <option value="">실내외 선택</option>
          <option value="실내">실내</option>
          <option value="실외">실외</option>
        </select>

      <select value={grassWhether} onChange={(e) => setGrassWhether(e.target.value)}>
        <option value="">잔디 유형 선택</option>
        <option value="천연">천연 잔디</option>
        <option value="인조">인조 잔디</option>
      </select>

      {fields.map(field =>
      <li key={field.id}>

        <h2>{field.fieldName}</h2>
        <p>운영 시간: {field.operatingHours} ~ {field.closingTime}</p>
        <p>장소: {field.province}</p>
        <p>실내외: {field.inOutWhether}</p>
        <p>잔디 종류: {field.grassWhether}</p>
        <p>구장 크기: {field.fieldSize}</p>
        <p>대관비: {field.reservationFee}</p>
        <p>화장실 여부: {field.toiletStatus ? '있음' : '없음'}</p>
        <p>샤워실 여부: {field.showerStatus ? '있음' : '없음'}</p>
        <p>주차장 여부: {field.parkingStatus ? '있음' : '없음'}</p>
        <p>구장 이미지1: {field.fieldImg1}</p>
        
        {field.reservationInfo && (
          <>
            <h3>예약 가능</h3>
              { field.reservationInfo.availableTimes.map(time => 
                <li key={time}>{time}</li>)
              }
            { field.reservationInfo.reservedTimes.length > 0 && (
              <>
                <h3>예약 불가능</h3>
                  { field.reservationInfo.reservedTimes.map(time => 
                    <li key={time}>{time}</li>)
                  }
              </>
            )}
          </>
        )}
      </li>)}
    </div> 
  )}
export default ReservationList;