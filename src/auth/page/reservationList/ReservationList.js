import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NaviBar from '../main/naviBar/NaviBar';
import axios from "axios";
import { useUser } from '../../../userComponent/userContext/UserContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

const provinces = [
  "서울", "경기", "인천", "강원", "대전",
  "충남/세종", "충북", "대구","경북",
  "부산","울산","경남","광주",
  "전남","전북","제주"
];

const ReservationList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [preferredProvince, setPreferredProvince] = useState(''); 
  const [reservationFieldList, setReservationFieldList] = useState([]);
  const [operatingHoursStart, setOperatingHoursStart] = useState('');
  const [operatingHoursEnd, setOperatingHoursEnd] = useState('');
  const [selectedInOut, setSelectedInOut] = useState('');
  const [selectedGrass, setSelectedGrass] = useState('');

  // useUser 훅을 통해 현재 로그인한 사용자의 정보 가져오기
  const { getUserInfo, userInfo } = useUser();
  
  const userId = userInfo?.id; 
  const preferredCity = userInfo?.preferredCity;

  // 선호 도시로 초기 필터 설정. 만약 선호 도시 정보가 없다면 기본값으로 '서울' 설정
  const [selectedProvince, setSelectedProvince] = useState(
    userId && preferredCity ? preferredCity : '서울'
  );

  // 캘린더로 일자 선택
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 경기 시작 시간 
  const [startTime, setStartTime] = useState('');

  // 시간 옵션 생성
  const timeOptions = [];
  for(let i=0; i<24; i++) {
    const timeString = `${i.toString().padStart(2, '0')}:00`;
    timeOptions.push(timeString);
  }

  async function fetchUserPreferences() {
    try {
      const userInfo = await getUserInfo();
      return userInfo;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReservationFieldList = async () => {
    try {
      let response;
      if (selectedDate && startTime) { 
        // userId가 있는 경우에만 userId 파라미터를 추가
        const params = userId ? { 
          userId,
          operatingHoursStart: operatingHoursStart,
          operatingHoursEnd: operatingHoursEnd,
          inOutWhether: selectedInOut, 
          grassWhether: selectedGrass,
          province: selectedProvince
        } : {
          operatingHoursStart: operatingHoursStart,
          operatingHoursEnd: operatingHoursEnd,
          inOutWhether: selectedInOut, 
          grassWhether: selectedGrass, 
          province: selectedProvince
        };
  
        response = await axios.get("/field/reservation/list", { params });
      } else { 
        response = await axios.get("/field/reservation/list");
      }
      return response.data; 
    } catch (error) {
      console.error(error);
      return null; 
    }
  };
    
  useEffect(() => {
    const fetchData = async () => { 
      try {
        let preferences;
        preferences=await fetchUserPreferences();
        setIsLoggedIn(true);
        setPreferredProvince(preferences.preferredCity || '서울');
        setSelectedProvince(preferences.preferredCity || '서울');
        
        // 예약 가능한 구장 리스트 가져오기
        let reservationList;
        reservationList=await fetchReservationFieldList();
        
       setReservationFieldList(reservationList);
        
     } catch (error) {
       setIsLoggedIn(false);
     }
   }
   fetchData(); 
  }, [
    selectedDate,
    startTime,
    selectedInOut, 
    selectedGrass,
    selectedProvince
  ]);
  
  const navigate = useNavigate();
  
  const handleClick = (fieldId) => {
    navigate("/reservation/detail/" + fieldId);
  }

  // 오늘부터 정확히 15일 후의 날짜 계산
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);
  
  useEffect(() => {
    fetchReservationFieldList();
  }, [selectedDate, startTime, selectedInOut, selectedGrass, selectedProvince]); 

  return (
    <>
      <NaviBar />
        <div style={{display: 'inline-flex', flexWrap: 'wrap'}}>
          {/* 지역 선택 */}
          <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
            {provinces.map((province) =>
              <option key={province} value={province}>{province}</option>
            )}
          </select>

          {/* 날짜 선택 */}
          <DatePicker 
            selected={selectedDate} 
            onChange={(date) => setSelectedDate(date)} 
            minDate={new Date()} 
            maxDate={maxDate}
            locale={ko}
          />

          {/* 경기 시작 시간 선택 */}
          <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
            <option value="">시간</option>
            {timeOptions.map((time) =>
              <option key={time} value={time}>{time}</option>
            )}
          </select>   

          {/* 실내외 선택 */}
          <select value={selectedInOut} onChange={(e) => setSelectedInOut(e.target.value)}>
             <option value="">실내/실외</option>
             <option value="실내">실내</option>
             <option value="실외">실외</option>
           </select>

          {/* 잔디 선택 */}
          <select value={selectedGrass} onChange={(e) => setSelectedGrass(e.target.value)}>
            <option value="">잔디종류</option>
            <option value="천연">천연잔디</option>
            <option value="인조">인조잔디</option>
          </select>
        </div>

        <div>
          {reservationFieldList && reservationFieldList.map((field) =>
            <div key={field.id} onClick={() => handleClick(field.id)}>
              <h2>{field.fieldName}</h2>
              <p>운영 시간: {field.operatingHours}-{field.closingTime}</p>
              <p>지역: {field.region}</p>
              <p>예약료: ${field.reservationFee}</p>
            </div>
          )}
        </div>
      </>
    );
};

export default ReservationList;