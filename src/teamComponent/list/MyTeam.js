import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../userComponent/userContext/UserContext';
import styles from './List.module.css';

const MyTeam = () => {
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const [teamInfo, setTeamInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfo) {
      axios.get(`/team/myTeam/${userInfo.id}`)
        .then(response => {
          setTeamInfo(response.data);
        })
        .catch(error => {
          console.error('팀 정보를 가져올 수 없습니다.', error);
        })
        .finally(() => {
          setLoading(false);  // 로딩 완료 후 로딩상태 변경
        });
    }
  }, [userInfo]);

  return (
    <div className={styles.myTeamCard}>
      {userInfo ? (
        <div>
          <h2>내 팀 정보</h2>
          {loading ? ( // 로딩 중일 때
            <p className={styles.notice}>팀을 확인하는 중...</p>
          ) : teamInfo ? (
            <div>
              <p>팀 이름: {teamInfo.teamName}</p>
              <p>지역: {teamInfo.area}</p>
              <p>평균나이: {teamInfo.averageAge}</p>
              <p>입단비: {teamInfo.entryfee}</p>
              <p>입단성별: {teamInfo.entryGender}</p>
              <p>선호시간 : {teamInfo.preferredTime}</p>
              <p>선호요일: {teamInfo.preferredDay}</p>
            </div>
          ) : (
            <p className={styles.notice}>팀에 가입해주세요.</p>
          )}
        </div>
      ) : (
        <p className={styles.notice}>로그인 후 팀 정보를 확인할 수 있습니다.</p>
      )}
    </div>
  );
};

export default MyTeam;