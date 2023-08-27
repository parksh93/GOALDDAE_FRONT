import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../userComponent/userContext/UserContext';

import styles from './Detail.module.css';

const MyTeamDetail = () => {
    const { userInfo } = useUser();
    const [teamInfo, setTeamInfo] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (userInfo) {
        axios.get(`/team/myTeam/${userInfo.teamId}`)
          .then(response => {
            setTeamInfo(response.data);
            setError(false);
          })
          .catch(error => {
            console.error('팀 정보를 가져올 수 없습니다.', error);
            setError(true);
          });
      }
    },[userInfo]);

    return (
    <div>
        {error ? (
        <p>존재하지 않는 팀입니다.</p>
        ) : teamInfo ? (
        <div className={styles.teamInfo}>
            <h2>
            <img className={styles.teamProfileImgUrl} src={teamInfo.teamProfileImgUrl}/>
            {teamInfo.teamName}
            </h2>
            <p>지역: {teamInfo.area}</p>
            <p>평균나이: {teamInfo.averageAge}</p>
            <p>입단비: {teamInfo.entryfee}</p>
            <p>입단성별: {teamInfo.entryGender}</p>
            <p>선호시간: {teamInfo.preferredTime}</p>
            <p>선호요일: {teamInfo.preferredDay}</p>
            <div className={styles.teamInfoCard}>
              {teamInfo.teamInfo}
            </div>
            <p>모집여부: {teamInfo.recruiting ? ' 모집중' : ' 모집종료'}</p>
        </div>
        ) : (
        <p>팀 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default MyTeamDetail;