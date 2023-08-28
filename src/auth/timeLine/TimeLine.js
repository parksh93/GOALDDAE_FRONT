import React, { useState, useEffect } from "react";
import "./TimeLine.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import axios from "axios";

const TimeLine = () => {
  const [dates, setDates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchList, setMatchList] = useState([]);

  const fetchMatchList = async (date) => {
    try {
      const response = await axios.get("/createIndividualMatchTable", {
        params: { individualMatch: date },
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
    now.setTime(now.getTime() + timezoneOffset + 9 * 60 * 60 * 1000);

    /* 24시간마다 자동 일자 변경*/
    const datesArray = [];
    for (let i = 0; i < 15; i++) {
      const currentTime = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      const day = new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(currentTime);
      datesArray.push({ date: `${currentTime.getDate()}`, day });
    }

    setDates(datesArray);
  };
  
  useEffect(() => {
    generateDates();

    const timer = setInterval(() => {
      generateDates();
    }, 24 * 60 * 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  /* Next 화살표 */
  /* 실제 화면과 보여주는 화면에 따라 계산해서 화살표를 눌림 */
  const handleNextDate = () => {
    if (currentIndex < dates.length - 8) {
      setCurrentIndex((prevIndex) => prevIndex + 2);
    }
  };

  /* Prev 화살표 */
  /* 실제 화면과 보여주는 화면에 따라 계산해서 화살표를 눌림 */
  const handlePrevDate = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const visibleDates = dates.slice(currentIndex, currentIndex + 7);

  const handleDateClick = async (date, day) => {
    console.log(`선택된 날짜: ${date}, 요일: ${day}`);
    // 타임라인 클릭 시 매치리스트를 가져옵니다.
    const fetchedMatches = await fetchMatchList(date);
    setMatchList(fetchedMatches);
  };

  return (
    <div className="timeline">
      <IconButton onClick={handlePrevDate} className="prev-date-btn">
        <ArrowBackIosIcon />
      </IconButton>
      <ul>
        {visibleDates.map((item, index) => (
          <li
            key={index}
            className={`timeline-date-item ${item.day === "토" ? "saturday" : item.day === "일" ? "sunday" : ""}`}
            onClick={() => handleDateClick(item.date, item.day)}
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
  );
};

export default TimeLine;