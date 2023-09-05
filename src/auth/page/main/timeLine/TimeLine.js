import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TimeLine.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IndividualMatch from "./IndividualMatch";
import UseWebSocket from "../../../../webSocket/UseWebSocket";
import { Box } from "@material-ui/core";

  const provinces = [
  "서울", "경기", "인천", "강원", "대전",
  "충남/세종", "충북", "대구","경북",
  "부산","울산","경남","광주",
  "전남","전북","제주"
  ];

const TimeLine = () => {
  const [dates, setDates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchList, setMatchList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const matchStatusMessage = UseWebSocket('http://localhost:8080/webSocket');
  const [selectedProvince, setSelectedProvince] = useState('서울');

  useEffect(() => {
    fetchMatchList(selectedProvince).then(setMatchList);
  }, [selectedProvince]);

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

  const fetchMatchList = async (province, date) => {
    try {
      const startDate = `${date}T00:00:00`;
      const endDate = `${date}T23:59:59`;

      const response = await axios.get("/match/individual", {
        params: { 
          province,
          startDate,
          endDate
        },
      });
      return response.data;
    } catch (error) {
      console.error("Network error:", error);
      return [];
    }
  };


  const generateDates = () => {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
    now.setTime(now.getTime() + timezoneOffset);

    const datesArray = [];
    for (let i = 0; i < 15; i++) {
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

  const handleDateClick = async (date, month, year, day) => {
    console.log(`선택된 날짜: ${year}-${month}-${date}, 요일: ${day}`);
    const selectedDateStr = `${year}-${month.padStart(2,'0')}-${date.padStart(2,'0')}`; 
    setSelectedDate(selectedDateStr); 
    const fetchedMatches = await fetchMatchList(selectedProvince, selectedDateStr); 
    setMatchList(fetchedMatches);
  };

  useEffect(() => {
  generateDates();

  const timer = setInterval(() => {
    generateDates();
  }, 24 * 60 * 60 * 1000);

  const fetchTodayMatchList = async () => {
    const today = new Date();
    const date = String(today.getDate()).padStart(2,'0');
    const month = String(today.getMonth() + 1).padStart(2,'0'); 
    const year = today.getFullYear();

    const selectedDateStr = `${year}-${month}-${date}`;
    
    const fetchedMatches = await fetchMatchList(selectedProvince, selectedDateStr);
    
    setMatchList(fetchedMatches);
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

  const visibleDates = dates.slice(currentIndex, currentIndex + 7);

  return (
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
        </div>

        {matchList.length > 0 && (
            <>
              {matchList.map((match) => (
                <Box key={match.id}>
                  <IndividualMatch match={match} />
                </Box>
              ))}
            </>
          )}
        </Box>
      </div>
    );
  }

export default TimeLine;