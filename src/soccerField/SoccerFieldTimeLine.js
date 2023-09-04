import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Box } from "@material-ui/core";
import styles from './SoccerFieldTimeLine.module.css';
import ReservationModal from "./ReservationModal";

const SoccerFieldTimeLine = (props) => {
  const [dates, setDates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const reservedTime = [8, 14, 18];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (time) => {
    setSelectedTime(time); // 모달 열 때 선택된 시간 정보 설정
    setIsModalOpen(true);
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
    setSelectedDate(date);
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
            {Array.from({ length: 8 }, (_, index) => {
              const startTime = 6 + index * 2;
              const endTime = startTime + 2;
              const reservationFee = props.fieldInfo.reservationFee;
              const isReserved = reservedTime.includes(startTime); // 시간이 예약된 시간인지 확인

              return (
                <div key={index}>
                  {isReserved ? (
                    <div className={styles.reservedTime}>
                      {`${startTime}:00 ~ ${endTime}:00 (2시간) ${reservationFee}원`}
                    </div>
                  ) : (
                    <div className={styles.reservationLink}>
                      <Link                        
                        onClick={() => openModal(startTime)}
                      >
                        {`${startTime}:00 ~ ${endTime}:00 (2시간) ${reservationFee}원`}
                      </Link>     
                    </div>

                  )}
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
        />
      </Box>
    </div>
  );
}

export default SoccerFieldTimeLine;