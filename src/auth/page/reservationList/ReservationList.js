import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../userComponent/userContext/UserContext';

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


return (
    <div> 
        <select value={selectedProvince} onChange={e => setSelectedProvince(e.target.value)}> 
        <option value="">지역 선택</option> {provinces.map(province => <option key={province} value={province}>{province}</option> )} </select>
        
        <label>
          예약일:
          <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
        </label>

        <select value={reservationPeriod} onChange={(e) => setReservationPeriod(e.target.value)}>
          <option value="">시간대 선택</option>
          <option value="아침">아침</option>
          <option value="점심">점심</option>
          <option value="저녁">저녁</option>
        </select>

        <select value={inOutWhether} onChange={(e) => setInOutWhether(e.target.value)}>
          <option value="">실내외 선택</option>
          <option value="실내">실내</option>
          <option value="실외">실외</option>
        </select>

      <select value={grassWhether} onChange={(e) => setGrassWhether(e.target.value)}>
        <option value="">잔디 유형 선택</option>
        <option value="천연">천연 잔디</option>
        <option value="인공">인공 잔디</option>
      </select>

      {fields.map(field =>
      <li key={field.id}>
        <h2>{field.fieldName}</h2>
        <p>운영 시간: {field.operatingHours} ~ {field.closingTime}</p>
        <p>장소: {field.province}</p>
        <p>실내외: {field.inOutWhether}</p>
        <p>잔디 종류: {field.grassWhether}</p>

        {field.reservationInfo && (
          <>
            <h3>예약 가능</h3>
            <ul>
              { field.reservationInfo.availableTimes.map(time => 
                <li key={time}>{time}</li>)
              }
            </ul>
            { field.reservationInfo.reservedTimes.length > 0 && (
              <>
                <h3>예약 불가능</h3>
                <ul>
                  { field.reservationInfo.reservedTimes.map(time => 
                    <li key={time}>{time}</li>)
                  }
                </ul>
              </>
            )}
          </>
        )}
      </li>)}
    </div> 
  )}
export default ReservationList;