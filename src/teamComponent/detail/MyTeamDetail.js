import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../userComponent/userContext/UserContext';
import styles from './Detail.module.css';
import { useParams } from 'react-router-dom';

const MyTeamDetail = () => {
    const { userInfo } = useUser();
    const [teamInfo, setTeamInfo] = useState(null);
    const [error, setError] = useState(false);
    const [selectedTab, setSelectedTab] = useState('info');

    const { tabName } = useParams();

    useEffect(() => {
      if (['info', 'recentMatch', 'reservMatch', 'members', 'applyList'].includes(tabName)) {
        setSelectedTab(tabName);
      }
    }, [tabName]);

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

    const handleTabChange = (tabName) => {
      setSelectedTab(tabName);
    };

  return (
    <div>
        {error ? (
        <p>가입한 팀을 확인할 수 없습니다.</p>
        ) : teamInfo ? (
      <div className={styles.myTeamContainer}>
        <div className={styles.myTeamLeftContainer}>
          <div className={styles.myTeamInfoContainer}>
              <h2 className={styles.myTeamProfile}>
              <div className={styles.circularImageContainer}>
                <div className={styles.circularImage}>
                  <img className={styles.teamProfileImgUrl} src={teamInfo.teamProfileImgUrl}/>
                </div>
              </div>
                {teamInfo.teamName}
              </h2>
              <div className={styles.myTeamInfo}>
                <p>지역 | {teamInfo.area}</p>
                <p>평균나이 | {teamInfo.averageAge} 세</p>
                <p>입단비 | {teamInfo.entryfee} 원</p>
                <p>입단성별 | {teamInfo.entryGender}</p>
              </div>               
          </div>
            <div>
              <button className={styles.teamDetailUpdateBtn}>
                프로필 설정
              </button>
            </div>
        </div>

        <div className={styles.myTeamRightContainer}>
          <div className={styles.myTeamFilters}>
            <button
              className={`${styles.myTeamInfoFilter} ${selectedTab === 'info' ? styles.activeTab : ''}`}
              onClick={() => handleTabChange('info')}
            >
              팀 정보
            </button>
            <button
              className={`${styles.myTeamRecentMatchFilter} ${selectedTab === 'recentMatch' ? styles.activeTab : ''}`}
              onClick={() => handleTabChange('recentMatch')}
            >
              매치 내역
            </button>
            
            <button
              className={`${styles.myTeamReservMatchFilter} ${selectedTab === 'reservMatch' ? styles.activeTab : ''}`}
              onClick={() => handleTabChange('reservMatch')}
            >
              예약 매치
            </button>
            <button
              className={`${styles.myTeamMemberFilter} ${selectedTab === 'members' ? styles.activeTab : ''}`}
              onClick={() => handleTabChange('members')}
            >
              팀원
            </button>
           
            <button
              className={`${styles.myTeamApplyListFilter} ${selectedTab === 'applyList' ? styles.activeTab : ''}`}
              onClick={() => handleTabChange('applyList')}
            >
              가입신청
            </button>

          </div>
          <div className={styles.myTeamBox}>
            {selectedTab === 'info' && (
              <div className={styles.myTeamInfoBox}>
                <p>지역 | {teamInfo.area}</p>
                <p>평균나이 | {teamInfo.averageAge} 세</p>
                <p>입단비 | {teamInfo.entryfee} 원</p>
                <p>입단성별 | {teamInfo.entryGender}</p>
                <p>선호시간 | {teamInfo.preferredTime} 시</p>
                <p>선호요일 | {teamInfo.preferredDay}</p>
                <p>모집여부 | {teamInfo.recruiting ? ' 모집중' : ' 모집종료'}</p>
                <pre className={styles.myTeamIntroduce}>
                  {teamInfo.teamIntroduce}
                </pre>
              </div>
            )}
            {selectedTab === 'recentMatch' && (
              <div className={styles.myTeamRecentMatch}>
                최근 매치 내역이 없습니다.
              </div>
            )}
            {selectedTab === 'reservMatch' && (
              <div className={styles.myTeamReservMatch}>
                예약된 경기가 없습니다.
              </div>
            )}
            {selectedTab === 'members' && (
              <div className={styles.myTeamMembers}>
                등록된 팀원이 없습니다.
              </div>
            )}
            {selectedTab === 'applyList' && (
              <div className={styles.myTeamApplyList}>
                대기중인 가입신청이 없습니다.
              </div>
            )}
          </div>
        </div>

      </div>
        ) : (
        <p>팀 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default MyTeamDetail;