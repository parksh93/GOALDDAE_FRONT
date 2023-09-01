import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Box } from "@material-ui/core";
import styles from './SoccerFieldTimeLine.module.css';
import Modal from "@mui/material/Modal";
import Payment from "../payment/Payment";

const SoccerFieldTimeLine = (props) => {
  const [dates, setDates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
                style={{
                  color: item.day === "토" ? "blue" : item.day === "일" ? "red" : "#333333",
                  backgroundColor: selectedDate && selectedDate.date === item.date ? "#F3F3F3" : "transparent",
                }}
                className={styles.timelineDateItem}
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
              return (
                <div key={index}>
                  <Link
                    className={styles.reservationLink}
                    onClick={openModal}
                  >
                    {`${startTime}:00 ~ ${endTime}:00 (2시간) ${reservationFee}원`}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        <Modal
          open={isModalOpen}
          onClose={closeModal}
        >
          <Box sx={style}>
            우웅.
            <div>구장명 : {props.fieldInfo.fieldName}</div>
            <div>대관비 : {props.fieldInfo.reservationFee}</div>
            {selectedDate &&
            <div>예약일 : {selectedDate.year}-{selectedDate.month}-{selectedDate.date}</div>
            }
            <Payment
                  fieldId={props.fieldInfo.id}
                  fieldName={props.fieldInfo.fieldName}
                  reservationFee={props.fieldInfo.reservationFee}
                />
          </Box>
        </Modal>
      </Box>
    </div>
  );
}

export default SoccerFieldTimeLine;
