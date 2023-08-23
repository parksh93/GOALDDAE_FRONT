import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './TeamMain.module.css';

const TeamDetail = () => {
  const { id } = useParams(); // React Router의 useParams 훅을 사용하여 URL의 쿼리 파라미터 값을 가져옴
  const [teamInfo, setTeamInfo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`/team/detail/${id}`)
      .then(response => {
        setTeamInfo(response.data);
        setError(false);
      })
      .catch(error => {
        console.error('팀 정보를 가져올 수 없습니다.', error);
        setError(true);
      });
  }, [id]);

  return (
    <div>
      {error ? (
        <p>존재하지 않는 팀입니다.</p>
      ) : teamInfo ? (
        <div className={styles.teamInfo}>
          <h2>{teamInfo.teamName}</h2>
            <p>지역: {teamInfo.area}</p>
            <p>평균나이: {teamInfo.averageAge}</p>
            <p>입단비: {teamInfo.entryfee}</p>
            <p>입단성별: {teamInfo.entryGender}</p>
            <p>선호시간 : {teamInfo.preferredTime}</p>
            <p>선호요일: {teamInfo.preferredDay}</p>
            <p>모집여부: {teamInfo.recruiting}</p>
        </div>
      ) : (
        <p>팀 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default TeamDetail;
