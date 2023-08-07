import React, { useState, useEffect } from "react";

const generateTimeline = () => {
  const today = new Date();
  const timeline = [];

  for (let i = 0; i < 15; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    timeline.push(currentDate);
  }

  return timeline;
};

const getDayOfWeek = (date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = date.getDay();
  return days[dayOfWeek];
};

const TimeLine = () => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const newTimeline = generateTimeline();
    setTimeline(newTimeline);
  }, []);

  return (
    <div>
         {timeline.map((date, index) => (
          <li key={index}>{`${date.getDate()} (${getDayOfWeek(date)})`}</li>
        ))}
    </div>
  );
};

export default TimeLine;
