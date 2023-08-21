import React, { useState } from 'react';
import axios from 'axios';

const SoccerFieldTable = () => {
  // 상태 선언
  const [id, setId] = useState(0);
  const [fieldName, setFieldName] = useState('');
  const [toiletStatus, setToiletStatus] = useState(0);
  const [showerStatus, setShowerStatus] = useState(0);
  const [parkingStatus, setParkingStatus] = useState(0);
  const [requirements, setRequirements] = useState('');
  const [fieldSize, setFieldSize] = useState('');
  const [fieldImg1, setFieldImg1] = useState('');
  const [fieldImg2, setFieldImg2] = useState('');
  const [fieldImg3, setFieldImg3] = useState('');
  const [reservationFree, setReservationFree] = useState(0);
  const [inOutStatus, setInOutStatus] = useState('');
  const [grassStatus, setGrassStatus] = useState('');
  const [region, setRegion] = useState('');

  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const soccerField = {
        id: id,
        fieldName: fieldName,
        toiletStatus: toiletStatus,
        showerStatus: showerStatus,
        parkingStatus: parkingStatus,
        requirements: requirements,
        fieldSize: fieldSize,
        fieldImg1: fieldImg1,
        fieldImg2: fieldImg2,
        fieldImg3: fieldImg3,
        reservationFree: reservationFree,
        inOutStatus: inOutStatus,
        grassStatus: grassStatus,
        region: region,
      };
      const response = await axios.post('/api/MainController/addSoccerField', soccerField);
      // 서버로부터 데이터를 얻은 후 처리
      // 예: 결과 메시지 표시, 입력 필드 초기화 등
    } catch (error) {
      console.error(error);
    }
  };

  // 렌더링
  return (
    <div>
      <h1>구장 등록</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            아이디 
            <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            구장 이름
            <input type="text" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            화장실 여부
            <input type="number" value={toiletStatus} onChange={(e) => setToiletStatus(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            샤워시설 여부
            <input type="number" value={showerStatus} onChange={(e) => setShowerStatus(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            주차장 여부
            <input type="number" value={parkingStatus} onChange={(e) => setParkingStatus(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            요구사항
            <input type="text" value={requirements} onChange={(e) => setRequirements(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            구장 크기
            <input type="text" value={fieldSize} onChange={(e) => setFieldSize(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            구장 이미지 1
            <input type="text" value={fieldImg1} onChange={(e) => setFieldImg1(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            구장 이미지 2
            <input type="text" value={fieldImg2} onChange={(e) => setFieldImg2(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            구장 이미지 3
            <input type="text" value={fieldImg3} onChange={(e) => setFieldImg3(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            예약 가능 여부
            <input type="number" value={reservationFree} onChange={(e) => setReservationFree(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            실내/실외 여부
            <input type="text" value={inOutStatus} onChange={(e) => setInOutStatus(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            잔디 여부
            <input type="text" value={grassStatus} onChange={(e) => setGrassStatus(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            지역
            <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
          </label>
        </div>
        <input type="submit" value="추가" />
      </form>
    </div>
  );
};

export default SoccerFieldTable;
