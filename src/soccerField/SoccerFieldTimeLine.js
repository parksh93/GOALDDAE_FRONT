import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Box } from "@material-ui/core";
import styles from './SoccerFieldTimeLine.module.css';
import ReservationModal from "./ReservationModal";
import { useUser } from "../userComponent/userContext/UserContext";
import axios from "axios";

const SoccerFieldTimeLine = (props) => {
  const { userInfo } = useUser();

  const [dates, setDates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [reservedTime, setReservedTime] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // props.fieldInfo에서 시작시간과 종료시간 추출
  const startTimeStr = props.fieldInfo.operatingHours;
  const closingTimeStr = props.fieldInfo.closingTime;

  // 시작시간과 종료시간을 시간으로 변환
  const openTime = parseInt((startTimeStr||'').split(":")[0]);
  const closingTime = parseInt((closingTimeStr||'').split(":")[0]);


  const openModal = (time) => {

    if(!userInfo){
      alert("로그인 이후 이용 가능합니다.");
      window.location.href = "/login";
    } else{
      setSelectedTime(time); // 모달 열 때 선택된 시간 정보 설정
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const generateDates = () => {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
    now.setTime(now.getTime() + timezoneOffset);

    const datesArray = [];
    for (let i = 0; i < 15; i++) {
      const currentTime = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      const day = new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(currentTime);
      datesArray.push({
        date: currentTime.getDate(),
        month: currentTime.getMonth() + 1,
        year: currentTime.getFullYear(),
        day,
      });
    }
    setDates(datesArray);
  };

  const handleDateClick = (date) => {
    if(selectedDate === date){
      setSelectedDate(null);
      return;
    }

    setSelectedDate(date);
    const dateFormat = date.year*10000+date.month*100+date.date;
    const fieldId = props.fieldInfo.id;

    axios
      .get(`/reservation/times?fieldId=${fieldId}&date=${dateFormat}`)
      .then((response) => {
        setReservedTime(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reservation times:', error);
      });
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

  const handleNextDate = () => {
    if (currentIndex < dates.length - 6) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevDate = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const visibleDates = dates.slice(currentIndex, currentIndex + 5);

  return (
    <div className={styles.timeline}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handlePrevDate} className={styles.prevDateBtn}>
            <ArrowBackIosIcon />
          </IconButton>
          <ul>
            {visibleDates.map((item, index) => (
              <li
                key={index}
                className={`
                  ${styles.timelineDateItem} 
                  ${selectedDate && selectedDate.date === item.date ? styles.selectedDate :
                    item.day === "토" ? styles.saturday : item.day === "일" ? styles.sunday : ''}
                `}
                onClick={() => handleDateClick(item)}
              >
                <div>
                  <div>{item.date}</div>
                  <div>{item.day}</div>
                </div>
              </li>
            ))}
          </ul>
          <IconButton onClick={handleNextDate} className={styles.nextDateBtn}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        {selectedDate && (
          <div>
            {Array.from({ length: (closingTime - openTime) / 2 }, (_, index) => {
              const startTime = openTime + index * 2;
              const endTime = startTime + 2;
              const reservationFee = props.fieldInfo.reservationFee;
              const isReserved = reservedTime.includes(startTime); // 시간이 예약된 시간인지 확인

              return (
                <div key={index}>
                  {reservedTime && !isReserved ? (
                    <div className={styles.reservationLink}>
                      <Link                        
                        onClick={() => openModal(startTime)}
                      >
                        {`${startTime}:00 ~ ${endTime}:00 (2시간) ${reservationFee}원`}
                      </Link>     
                    </div>
                  ) : (
                    <div className={styles.reservedTime}>
                      {`${startTime}:00 ~ ${endTime}:00 (2시간) ${reservationFee}원`}
                    </div>
                  ) }
                </div>
              );
            })}
          </div>
        )}
        <ReservationModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          fieldInfo={props.fieldInfo}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          userInfo={userInfo && userInfo}
        />
      </Box>
    </div>
  );
}

export default SoccerFieldTimeLine;