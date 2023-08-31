import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TimeLine.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IndividualMatch from "../page/match/IndividualMatch";
import { Box } from "@material-ui/core";

const TimeLine = () => {
    const [dates, setDates] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [matchList, setMatchList] = useState([]);

    const fetchMatchList = async (date, month, year) => {
      try {
        const fullDate= `${year}-${String(month).padStart(2,'0')}-${String(date).padStart(2,'0')}`;
        const response = await axios.get("/individual/match", {
          params: {
            date: fullDate,
          },
        });
        
        return response.data;
      } catch (error) {
        console.error("네트워크 에러:", error);
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
      const fetchedMatches = await fetchMatchList(date, month, year);
      setMatchList(fetchedMatches);
  };

    useEffect(() => {
      generateDates();

      const timer = setInterval(() => {
        generateDates();
      }, 24 * 60 * 60 * 1000);

      const fetchTodayMatchList = async () => {
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1; 
        const year = today.getFullYear();
      
        const fetchedMatches = await fetchMatchList(date, month, year);
        
        setMatchList(fetchedMatches);
      };
      
      fetchTodayMatchList();

      return () => {
        clearInterval(timer);
      };
    }, []);

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
              {visibleDates.map((item, index) => (
                <li
                  key={index}
                  className={`timeline-date-item ${item.day === "토" ? "saturday" : item.day === "일" ? "sunday" : ""}`}
                  onClick={() => handleDateClick(item.date, item.month, item.year, item.day)}
                >
                  <div>
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
