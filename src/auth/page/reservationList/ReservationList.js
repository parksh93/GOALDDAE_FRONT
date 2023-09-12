import React, { useState } from 'react';
import NaviBar from '../main/naviBar/NaviBar';
import { Select, MenuItem, Modal, DatePicker } from '@material-ui/core';

const ReservationList = () => {
  const [city, setCity] = useState("선호도시");
  const [date, setDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState({ start: "00:00", end: "24:00" });
  const [inOutType, setInOutType] = useState("");
  const [grassType, setGrassType] = useState("");


  return (
    <>
      <NaviBar />
      <Select value={city} onChange={(e) => setCity(e.target.value)}>
        <MenuItem value="서울">서울</MenuItem>
      </Select>
      <Modal open={"/* 모달 열림 여부 */"} onClose={"/* 모달 닫기 핸들러 */"}>
      </Modal>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
      <Select value={inOutType} onChange={(e) => setInOutType(e.target.value)}>
        <MenuItem value="실내">실내</MenuItem>
        <MenuItem value="실외">실외</MenuItem>
      </Select>
      <Select value={grassType} onChange={(e) => setGrassType(e.target.value)}>
        <MenuItem value="천연">천연</MenuItem>
        <MenuItem value="인조">인조</MenuItem>
      </Select>

    </>
  )
}

export default ReservationList;
