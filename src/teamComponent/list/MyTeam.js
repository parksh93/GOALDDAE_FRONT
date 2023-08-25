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

  const warpLoginPage = () => {
    navigate(`/login`);
  };

  return (
    <div className={styles.myTeamCard}>
      {userInfo ? (
        <div>
          {loading ? ( // 로딩 중일 때
            <div className={styles.noticeCheckTeam} > 
              <p>팀을 확인하는 중...</p>
            </div>
          ) : teamInfo ? (
            <div>
              <img className={styles.teamProfileImgUrl} src={teamInfo.teamProfileImgUrl} /> 
              {teamInfo.teamName}
              <p>지역: {teamInfo.area}</p>
              <p>평균나이: {teamInfo.averageAge}</p>
              <p>입단비: {teamInfo.entryfee}</p>
              <p>입단성별: {teamInfo.entryGender}</p>
              <p>선호시간 : {teamInfo.preferredTime}</p>
              <p>선호요일: {teamInfo.preferredDay}</p>
            </div>
          ) : (
            <div className={styles.noticeNoTeam} > 
              <p>가입된 팀이 없습니다. 팀에 가입해주세요.</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.noticeLogin} onClick={()=> warpLoginPage()}> 
          <p>로그인 후 팀 정보를 확인할 수 있습니다. (로그인하러 가기) </p>
        </div>
      )}
    </div>
  );
};

export default MyTeam;