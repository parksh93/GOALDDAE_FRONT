import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./Filter.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import useWebSocket from "../../../../webSocket/UseWebSocket";
import { Box, Button } from "@material-ui/core";
import { useLocation } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import TimeLineLoading from "../timeLineLoading/TimeLineLoading";

  const provinces = [
    "서울", "경기", "인천", "강원", "대전",
    "충남/세종", "충북", "대구","경북",
    "부산","울산","경남","광주",
    "전남","전북","제주"
    ];

const Filter = () => {
  const [dates, setDates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchList, setMatchList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const matchStatusMessage = useWebSocket('http://localhost:8080/webSocket');
  const [selectedProvince, setSelectedProvince] = useState('서울');
  const [selectedGender, setSelectedGender] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10; 
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);
  const observer = useRef();
  const navigate = useNavigate();

  const lastMatchElementRef = useCallback(node => {
    if (isLoading) return; 
    if (observer.current) observer.current.disconnect(); 

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && matchList.length >= pageSize * pageNumber) { 
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    });

    if (node) observer.current.observe(node); 

  }, [isLoading]); 

    React.useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
      }, 1000); 
  }, [location]);

  const getPlayerFormat = (playerNumber) => {
    const teamSize = playerNumber / 2;
    return teamSize + "대" + teamSize;
  };

  // 필터 변경 시 데이터 조회 갱신 
  useEffect(() => {
    const fetchAndSetMatchList = async () => {
      setPageNumber(1); // 페이지 번호 초기화
      setIsLoading(true);
      const matchData = await fetchMatchList();
      setMatchList(matchData.content || []);
      setIsLoading(false);
    };
    
    fetchAndSetMatchList();
  }, [selectedDate, selectedProvince, selectedGender]);

  // 필터 변경 혹은 페이지 수 변경 시 데이터 조회 갱신 
  useEffect(() => {
    const fetchAndAppendMatchList = async () => {
      setIsLoading(true);
      const newMatches = await fetchMatchList();
      
      if (newMatches.content.length > 0) { // 받아온 데이터가 있으면 추가
        setMatchList(prevMatches => [...prevMatches, ...newMatches.content]);
      }
      
      setIsLoading(false);
    };
    
    if (pageNumber > 1) { // 첫 페이지 로드 후에만 실행
      fetchAndAppendMatchList();
    }
  }, [selectedDate, selectedProvince, selectedGender, pageNumber]);

  // 웹소켓으로 매치 목록을 실시간으로 업데이트
  useEffect(() => {
    if (matchStatusMessage) {
      console.log('받은 메시지:', matchStatusMessage);
      
      setMatchList((prevMatchList) => 
        prevMatchList.map((match) =>
          match.id === matchStatusMessage.matchId
            ? { ...match, status: matchStatusMessage.status }
            : match
        )
      );
    }
  }, [matchStatusMessage]);    

  const fetchMatchList = async () => {
    try {
      const startTime = `${selectedDate}T00:00:00`;
  
      const response = await axios.get("/team/match/list", {
        params: { 
          province: selectedProvince,
          startTime,
          gender: selectedGender ? selectedGender : '',    
          page: pageNumber - 1, 
          size: pageSize  
        },
      });
      return response.data;
    } catch (error) {
      // 에러 확인
      // console.error("에러:", error);
      return { content: [] }; // 에러가 발생했을 경우 빈 배열을 포함하는 객체 반환
    }
  };

  const generateDates = () => {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
    now.setTime(now.getTime() + timezoneOffset);

    const datesArray = [];
    // 타임라인 금일부터 15일 뒤까지 조회
    for (let i = 0; i < 16; i++) {
      // 한국시간에 맞게 시간 보정
      const currentTime = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      const day = new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(currentTime);
      datesArray.push({ 
        date: `${currentTime.getDate()}`,
        month: `${currentTime.getMonth()+1}`,
        year: `${currentTime.getFullYear()}`,
        day 
      });
  }

  setDates(datesArray);
  };

  // 임의 날짜 선택했을때 데이터 출력
  const handleDateClick = async (date, month, year, day) => {
    // console.log(`선택된 날짜: ${year}-${month}-${date}, 요일: ${day}`);
    const selectedDateStr = `${year}-${month.padStart(2,'0')}-${date.padStart(2,'0')}`; 
    setSelectedDate(selectedDateStr); 
    const fetchedMatches = await fetchMatchList(selectedProvince, selectedDateStr); 
    setMatchList(fetchedMatches);
  };

  useEffect(() => {
    generateDates();

    // 24시간 마다 시간 동기화
    const timer = setInterval(() => {
      generateDates();
    }, 24 * 60 * 60 * 1000);

    // 유저가 페이지 첫 접속 했을 때 금일 매치리스트 조회
    const fetchTodayMatchList = async () => {
      const today = new Date();
      const date = String(today.getDate()).padStart(2,'0');
      const month = String(today.getMonth() + 1).padStart(2,'0'); 
      const year = today.getFullYear();

      // selectedDate가 null인 경우에만 오늘 날짜로 설정
      if (!selectedDate) {
        const selectedDateStr = `${year}-${month}-${date}`;
        setSelectedDate(selectedDateStr);
      }

     // 함수 호출 - 금일 매치리스트 
     fetchMatchList();

   };

   fetchTodayMatchList();

   return () => { clearInterval(timer); };
}, [selectedProvince]);

  const handleNextDate = () => {
    if (currentIndex < dates.length - 8) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevDate = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // 슬라이드 7개까지만 보이게
  const visibleDates = dates.slice(currentIndex, currentIndex + 7);

  return (
    <>
      <div className="timeline">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handlePrevDate} className="prev-date-btn">
                  <ArrowBackIosIcon />
                </IconButton>
                <ul>
                  {visibleDates.map((item) => (
                    <li
                      key={item.date}
                      className={`timeline-date-item 
                        ${item.day === "토" ? "saturday" : item.day === "일" ? "sunday" : ""}
                        ${`${item.year}-${String(item.month).padStart(2,'0')}-${String(item.date).padStart(2,'0')}` === selectedDate ? "selected-date" : ""} 
                      `}
                      onClick={() => handleDateClick(item.date, item.month, item.year, item.day)}
                    >
                      <div style={{ width: '30px', textAlign: 'center' }}> 
                        <div>{item.date}</div>
                        <div>{item.day}</div>
                      </div>  
                    </li>
                  ))}
                </ul>
                <IconButton onClick={handleNextDate} className="next-date-btn">
                  <ArrowForwardIosIcon />
                </IconButton>
            </div>
          <div className="filter">
            <select 
              value={selectedProvince} 
              onChange={(e) => setSelectedProvince(e.target.value)}
              style={{
                padding: '10px',
                fontSize: window.innerWidth <= 768 ? '12px' : '14px',
                border: 'none',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
              }}
            >
              {provinces.map((province) =>
                <option 
                  key={province} 
                  value={province}
                  style={{
                    fontSize: window.innerWidth <= 768 ? '12px' : '13px', 
                  }}
                >
                  {province}
                </option>
              )}
            </select>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              style={{
                padding: "10px",
                fontSize: window.innerWidth <= 768 ? "12px" : "14px",
                border: "none",
                borderRadius: "4px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, .15)",
              }}
            >
              <option value="">남녀모두</option>
              <option value="남자">남자</option>
              <option value="여자">여자</option>
            </select>
          </div>
          {matchList.length > 0 && matchList.map((match, index) => {
          let buttonStyle, isDisabled;
          switch(match.status) {
            case '신청가능':
              buttonStyle = {backgroundColor:'green', color:'white', fontSize:'10px', width:'100px'};
              isDisabled = false;
              break;

            case '마감임박': 
              buttonStyle = {backgroundColor:'red', color:'white', fontSize:'10px', width:'100px'};
              isDisabled = false;
              break;

            default:
              buttonStyle ={backgroundColor:'grey', color:'black', fontSize:'10px', width:'100px'};
              isDisabled = true; 
          }

          return (
            <Box key={match.id} ref={index === matchList.length -1 ? lastMatchElementRef : null} sx={{ display: 'flex', padding: "12px", marginTop: '16px', borderBottom: '1px solid lightgrey' }}>
              <Box sx={{ marginLeft:['10px','40px'], marginRight: '20px' ,marginTop : '8px' ,fontWeight : 'bold' ,fontSize :'14px'}}>
                {new Date(match.startTime).toLocaleTimeString([], { hour :'2-digit' ,minute :'2-digit' ,hour12 :false })}
              </Box>
              <Box sx={{ paddingX:[2,5],width:['100%','500px'] ,fontSize :'13px'}}>
                <div>{match.fieldName}</div>
                <div> &middot; {getPlayerFormat(match.playerNumber)} &middot;{match.gender} &middot;</div>
              </Box>
              <Button 
                style={buttonStyle} 
                disabled={isDisabled}
                onClick={() => navigate(`/match/team/detail/${match.id}`)}
              >
                {match.status}
              </Button>
            </Box> 
          );
          })}
           {isLoading && <TimeLineLoading />}
        </Box>
      </div>
      </>
    )
  }

export default Filter;