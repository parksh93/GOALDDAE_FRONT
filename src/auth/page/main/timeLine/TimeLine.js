import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./TimeLine.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import UseWebSocket from "../../../../webSocket/UseWebSocket";
import { Box, Button } from "@material-ui/core";
import {useUser} from '../../../../userComponent/userContext/UserContext'
import {Link, useNavigate} from 'react-router-dom'
import TimeLineLoading from "./TimeLineLoading";

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
  const matchStatusMessage = UseWebSocket('http://223.130.137.115:80/webSocket');

  const [selectedProvince, setSelectedProvince] = useState('서울');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [lastMatchId, setLastMatchId] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const getPlayerFormat = (playerNumber) => {
    const teamSize = playerNumber / 2;
    return teamSize + "대" + teamSize;
  };

  // 필터를 재 선택할때마다 데이터 조회 갱신 
  useEffect(() => {
    setLoading(true);
    setMatchList([]);
    setLastMatchId(0);
    fetchMatchList();
  }, [selectedProvince, selectedGender, selectedLevel, selectedDate]);

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
    // 타임라인 선택된 시간 00:00:00 ~ 24:00:00
    const startTime = `${selectedDate}T00:00:00`;
    await axios.get("/match/individual", {
          // 서버에 전달할 쿼리
          params: { 
            province: selectedProvince,
            startTime,
            level: selectedLevel ? selectedLevel : '', 
            gender: selectedGender ? selectedGender : '' ,
            lastMatchId
          },
        }).then(res => {
          if(selectedDate !== null){
            if(res.data.length !== 0){
                setLastMatchId(res.data[res.data.length -1].id);
                  
                if(matchList.length === 0){
                  setMatchList(res.data);
                }else{
                  res.data.map((match) => {
                    let startDate = new Date(match.startTime).getDate();
                    let nowSelectDate = new Date(selectedDate).getDate();
                    
                    console.log("startDate : ",startDate)
                    console.log("selectDate : " , nowSelectDate);
                    if(startDate === nowSelectDate) {
                      setMatchList((prev) => [...prev, match]);
                    }
                  })
                }
              }
          }
          setLoading(false);
        }).catch((error) => {
          console.log(error);
        })
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
    setSelectedDate(null);
    // console.log(`선택된 날짜: ${year}-${month}-${date}, 요일: ${day}`);
    const selectedDateStr = `${year}-${month.padStart(2,'0')}-${date.padStart(2,'0')}`; 
    setSelectedDate(selectedDateStr); 
  };
  
  useEffect(() => {
    generateDates();

    // 24시간 마다 시간 동기화
    const timer = setInterval(() => {
      generateDates();
    }, 24 * 60 * 60 * 1000);
    
    // 유저가 페이지 첫 접속 했을 때 금일 매치리스트 조회
      const today = new Date();
      const date = String(today.getDate()).padStart(2,'0');
      const month = String(today.getMonth() + 1).padStart(2,'0'); 
      const year = today.getFullYear();
      
      // selectedDate가 null인 경우에만 오늘 날짜로 설정
      if (!selectedDate) {
        const selectedDateStr = `${year}-${month}-${date}`;
        setSelectedDate(selectedDateStr);
      }
      
      return () => { clearInterval(timer); };
    }, [selectedProvince]);
    
    useEffect(() => {
      setLastMatchId(0);
      setMatchList([]);
      setLoading(true);
      fetchMatchList();
    },[selectedDate])

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

  
  let options = {
    threshold: 0.5,
    rootMargin: '0px'
  }
  
  const callback = () => {
    if(!loading){
      setLoading(true);
    }
  }
  
  useEffect(() => {
    if(loading){
      fetchMatchList();
    }
  }, [loading])

  
  let target = useRef();
  let observer = new IntersectionObserver(callback, options);
  
  useEffect(() => {
    observer.observe(target.current);
  },[]);

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
              onClick={() => {
                handleDateClick(item.date, item.month, item.year, item.day)
              }}
            >
            <div style={{ width: '80px', textAlign: 'center' }}> 
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

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            style={{
              padding: "10px",
              fontSize: window.innerWidth <= 768 ? "12px" : "14px",
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, .15)",
            }}
          >    
            <option val="">레벨</option>  
            <option val="유망주">유망주</option>   
            <option val="세미프로">세미프로</option>   
            <option val="프로">프로</option>   
            <option val="월드클래스">월드클래스</option>
          </select>
        </div>

        {matchList.length > 0 && matchList.map((match) => {

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
            buttonStyle = {backgroundColor:'grey', color:'black', fontSize:'10px', width:'100px'};
            isDisabled = true; 
          }
          
        
        return (
          <Box key={match.id} sx={{ display: 'flex', padding: "12px", marginTop: '16px', borderBottom: '1px solid lightgrey' }} onClick={() => navigate(`/match/individual/detail/${match.id}`)}>
              <Box sx={{ marginLeft:['10px','40px'], marginRight: '20px' ,marginTop : '8px' ,fontWeight : 'bold' ,fontSize :'14px'}}>
                {new Date(match.startTime).toLocaleTimeString([], { hour :'2-digit' ,minute :'2-digit' ,hour12 :false })}
              </Box>
              <Box sx={{ paddingX:[2,5],width:['100%','700px'] ,fontSize :'12px'}}>
                <div style={{fontSize: "17px", marginBottom: "5px"}}>{match.fieldName}</div>
                <div> &middot; {getPlayerFormat(match.playerNumber)} &middot;{match.gender} &middot;</div>
              </Box>
            <Button style={buttonStyle} disabled={isDisabled}>
              {match.status}
            </Button>
          </Box> 
        );
        })}
          <div ref={target}>
          {loading ?
            <TimeLineLoading />
          :
              ""
          }
            </div>
      </Box>
    </div>
    );
  }

export default TimeLine;