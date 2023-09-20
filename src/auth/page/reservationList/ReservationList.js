import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useUser } from '../../../userComponent/userContext/UserContext';
import { Box, Chip } from '@mui/material';
import FieldImg1 from './FieldImg1.jpeg';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import Loading from '../../../loading/Loading';
import { useLocation } from 'react-router-dom'; 
import Footer from '../../footer/Footer';
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
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10; 
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
      }, 1000); 
  }, [location]);

  useEffect(() => {
    if (selectedProvince) {
      axios.get('/field/reservation/list', { 
        params: {
          userId: null,
          inOutWhether,
          grassWhether,
          province : selectedProvince,
          reservationDate,
          reservationPeriod,
          pageNumber, 
          pageSize   
        }
      })
      .then(response => {
        if (pageNumber === 1) {
            setFields(response.data.content); // 첫 페이지일 경우에는 새로운 데이터만 설정
        } else {
            setFields(prevFields => [...prevFields, ...response.data.content]); // 그 외의 경우에는 이전 데이터와 합침
        }
      })
      .catch(error => console.error(`Error: ${error}`));
    }
  }, [selectedProvince, inOutWhether, grassWhether, reservationDate, reservationPeriod, pageNumber]);
  
  useEffect(() => {
    if (selectedProvince !== defaultProvince) { // defaultProvince와 다르면 fields와 pageNumber 초기화
      setFields([]);
      setPageNumber(1);
    }
  }, [selectedProvince]);
  
  const observer = useRef();
  const lastFieldElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    []
  );

  // 페이지 새로고침해도 지역 유지  
  useEffect(() => {
    const preferredCity = userInfo && userInfo.preferredCity ? userInfo.preferredCity : '서울';
    setSelectedProvince(preferredCity);
  }, [userInfo]);

return (
    <div> 
      <NaviBar />
      <select
          value={selectedProvince}
          onChange={e => setSelectedProvince(e.target.value)}
          style={{
            marginTop: '3%',
            marginLeft: '15%',
            padding: '8px',
            border: "none",
            borderRadius: "120px",
            boxShadow: "0 5px 10px rgba(0, 0, 0, .15)",
            fontSize: '14px',
          }}
        >
          <option value="">지역 선택</option>
          {provinces.map(province => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>

        <label>
          <input
            type="date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            style={{
              marginLeft: '1%',
              padding: '8px',
              width : '10%',
              border: "none",
              borderRadius: "120px",
              boxShadow: "0 5px 10px rgba(0, 0, 0, .15)",
              fontSize: '14px',
              fontFamily: 'bold',
              outline: 'none',
              textAlign: 'center',
              color: '#505050'
            }}
          />
        </label>

        <select
          value={reservationPeriod}
          onChange={(e) => setReservationPeriod(e.target.value)}
          style={{
            marginLeft: '1%',
            padding: '8px',
            border: "none",
            borderRadius: "120px",
            boxShadow: "0 5px 10px rgba(0, 0, 0, .15)",
            fontSize: '14px',
            color: '#505050'
          }}
        >
          <option value="">시간대 선택</option>
          <option value="오전">오전(06:00 ~ 12:00)</option>
          <option value="오후">오후(12:00 ~ 18:00)</option>
          <option value="저녁">저녁(18:00 ~ 24:00)</option>
        </select>

        <select
          value={inOutWhether}
          onChange={(e) => setInOutWhether(e.target.value)}
          style={{
            marginLeft: '1%',
            padding: '8px',
            border: "none",
            borderRadius: "120px",
            boxShadow: "0 5px 10px rgba(0, 0, 0, .15)",
            fontSize: '14px',
          }}
        >
          <option value="">실내외 선택</option>
          <option value="실내">실내</option>
          <option value="실외">실외</option>
        </select>

        <select
          value={grassWhether}
          onChange={(e) => setGrassWhether(e.target.value)}
          style={{
            marginLeft: '1%',
            padding: '8px',
            border: "none",
            borderRadius: "120px",
            boxShadow: "0 5px 10px rgba(0, 0, 0, .15)",
            fontSize: '14px',
          }}
        >
          <option value="">잔디 유형 선택</option>
          <option value="천연">천연 잔디</option>
          <option value="인조">인조 잔디</option>
        </select>
    
      {isLoading ? (
          <div style={{ marginTop:'12%', marginLeft:'29%', top: "40px", left: "0px", width: "40%", height: "calc(100% - 50px)", zIndex:"9999"}}>
            <Loading />
          </div>
        ) : fields.map((field, index) =>
        <div key={field.id} ref={index === fields.length - 1 ? lastFieldElementRef : null}>
            <Box key={field.id} sx={{marginLeft:'15%', borderBottom: `1px solid ${grey[500]}`, width: '1100px', marginTop:'40px'}}>
            <Box sx={{marginTop:'2%', fontSize:'20px', fontWeight:'bold'}}>
              <Link to={`/soccer_field/${field.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {field.fieldName}
              </Link>
            </Box>
              <Box sx={{fontSize:'13px', color: grey[600]}}>
                운영 시간: {field.operatingHours.split(':').slice(0, 2).join(':')} ~ {field.closingTime.split(':').slice(0, 2).join(':')}
              </Box>
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
                <img src={FieldImg1} alt="구장 이미지" style={{width:'120px', marginLeft:'80%'}}/>
              </Box>  

              {field.reservationInfo && (
                <>
                  <Box sx={{marginTop:'0%', fontSize:'14px', fontWeight:'bold'}}>예약 가능</Box>
                  <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                    <Link to={`/soccer_field/${field.id}`} style={{ textDecoration: 'none', color: 'inherit',display: 'flex', alignItems: 'start' }}>
                      {field.reservationInfo.availableTimes.map(time => 
                      <Box key={time} sx={{margin: '5px'}}>
                        <Chip label={time.split(':').slice(0, 2).join(':')} sx={{backgroundColor: '#2196f3', color: '#fff'}}/>
                      </Box>)}
                    </Link>
                  </Box>

                  {field.reservationInfo.reservedTimes.length > 0 && (
                    <>
                      <Box sx={{marginTop:'1%', fontSize:'14px', fontWeight:'bold'}}>예약 현황</Box>
                      <Box sx={{display: 'flex', flexWrap: 'wrap', marginBottom: '30px'}}>
                        {field.reservationInfo.reservedTimes.map(time => 
                          <Box key={time} sx={{margin: '5px'}}>
                            <Chip label={time.split(':').slice(0, 2).join(':')} sx={{backgroundColor: '#f44336', color:'#fff'}} />
                          </Box>)}
                      </Box>
                    </>
                  )}
                </>
              )}
              
            </Box>
       </div>
      )}
        <Footer />
    </div> 
  )}

export default ReservationList;