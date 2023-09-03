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
      axios.get(`/team/myTeam/${userInfo.teamId}`)
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

  const wrapTeamSave = () => {
    navigate(`/team/save`)  
  }

  const handleMyTeamClick = (id, tabName) => {
    navigate(`/team/myTeamDetail/${id}/${tabName}`);
  };

  return (
    <div className={`${styles.myCard} ${styles.paperEffect}`}>
      {userInfo ? (
        <div>
          {loading ? ( // 로딩 중일 때
            <div className={styles.noticeCheckTeam} > 
              <p>팀을 확인하는 중...</p>
            </div>
          ) : teamInfo ? (
            <div className={styles.myTeamContainer}>
                <div className={styles.myTeamProfileContainer}>
                    <div className={styles.teamCircularImageContainer}>
                        <div className={styles.teamCircularImage}>
                          <img className={styles.teamProfileImgUrl} 
                          src="/img/kirby-game-wallpaper-2880x1800_8.jpg" 
                          alt={teamInfo.teamName} />
                        </div>
                    </div>
                    <h2>{teamInfo.teamName}</h2>
                </div>

                <div className={styles.recentMatchContainer} onClick={() => handleMyTeamClick(teamInfo.id, 'recentMatch')}>
                  <h3>최근 매치</h3>
                    <div className={styles.recentMatchList}>
                      최근 매치가 없습니다.
                    </div>
                </div>

                <div className={styles.reservMatchContainer} onClick={() => handleMyTeamClick(teamInfo.id, 'reservMatch')}>
                  <h3>예약 매치</h3> 
                    <div className={styles.reservMatchList}>
                      예약된 매치가 없습니다.
                    </div>
                </div>  
                <div className={styles.viewDetails} onClick={() => handleMyTeamClick(teamInfo.id)}> 
                      상세보기 >
                </div>  
              </div>
          ) : (
            
            <div className={styles.noticeNoTeam}> 
              <p className={styles.noticeNoTeamText}  onClick={() => wrapTeamSave()} >가입된 팀이 없습니다. 팀에 가입하거나 팀을 생성해주세요. (팀 생성하기) </p>
            </div>
          
          )}
        </div>
      ) : (
        <div className={styles.noticeLogin}> 
          <p className={styles.noticeLoginText} onClick={warpLoginPage}>로그인 후 팀 정보를 확인할 수 있습니다. (로그인하러 가기) </p>
        </div>
      )}
    </div>
  );
};

export default MyTeam;