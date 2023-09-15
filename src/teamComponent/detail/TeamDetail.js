import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUser } from '../../userComponent/userContext/UserContext';
import styles from './Detail.module.css';

const TeamDetail = () => {
  const { id } = useParams();
  const [teamInfo, setTeamInfo] = useState(null);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  
  const { userInfo } = useUser();

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleApplication = () => {
    // 가입신청 로직 구현
    setApplicationSubmitted(true);
    setIsModalOpen(false); // 모달닫기

    const applicationData = {
      teamAcceptStatus: 0,
      teamId: teamInfo.id,
      userId: userInfo.id
    }

    axios.post('/team/addApply', applicationData)
    .then(response => {
      setSuccessModalOpen(true);
      console.log('가입신청 완료')
    })
    .catch(error=> {
      console.error('가입 신청 실패')
      alert('가입 신청에 실패했습니다.')
    })
  };

  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  return (
    <div className={styles.teamDetailBody}>
      {error ? (
        <p>존재하지 않는 팀입니다.</p>
      ) : teamInfo ? (
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <div className={styles.teamInfo1}>
              <h2 className={styles.teamProfile}>
              <div className={styles.circularImageContainer}>
                <div className={styles.circularImage}>
                  <img className={styles.teamProfileImgUrl} src={teamInfo.teamProfileImgUrl}/>
                </div>
              </div>
                {teamInfo.teamName}
              </h2>
                <p className={styles.teamInfoText}>지역 | {teamInfo.area}</p>
                <p className={styles.teamInfoText}>평균나이 | {teamInfo.averageAge} 세</p>
                <p className={styles.teamInfoText}>입단비 | {teamInfo.entryfee} 원</p>
                <p className={styles.teamInfoText}>입단성별 | {teamInfo.entryGender}</p>
                <p className={styles.teamInfoText}>선호시간 | {teamInfo.preferredTime} 시</p>
                <p className={styles.teamInfoText}>선호요일 | {teamInfo.preferredDay}</p>
              </div>
                <div className={styles.recruitingBtn}>
                  {userInfo && userInfo.teamId ? ( 
                    <button className={styles.recruitingFalseBtn} disabled>
                      모집중
                    </button>
                  ) : (
                    !teamInfo.recruiting ? (
                      <button className={styles.recruitingFalseBtn} disabled>
                        모집종료
                      </button>
                    ) : (
                      (userInfo.gender === '남성' && teamInfo.entryGender === '여성') ||
                      (userInfo.gender === '여성' && teamInfo.entryGender === '남성') ? (
                        <button className={styles.recruitingFalseBtn} disabled>
                          가입신청 불가
                        </button>
                      ) : (
                        <button className={styles.recruitingTrueBtn} onClick={openModal}>
                          모집중
                        </button>
                      )
                    )
                  )}
                </div>
          </div>

          <div className={styles.teamIntroduce}>
            {teamInfo.teamIntroduce !== null ? (
              <pre
                className={`${styles.teamIntroduceContent} ${
                  isModalOpen || successModalOpen ? styles.expanded : ''
                }`}
                >
                {teamInfo.teamIntroduce}
              </pre>
            ) : (
              <p className={styles.noTeamIntroduce}> 팀 소개글이 없습니다. </p>
            )}
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className={styles.modalContainer}>
              <div className={styles.modalContent}>
                <p> 
                  <span className={styles.teamName}> {teamInfo.teamName} </span>
                  팀에 가입 신청을 하시겠습니까?
                </p>
                <button className={styles.applyBtn} onClick={handleApplication}>
                  가입 신청
                </button>
                <button className={styles.closeBtn} onClick={closeModal}>
                  취소
                </button>
              </div>
            </div>
          )}

          {successModalOpen && (
            <div className={styles.modalContainer}>
              <div className={styles.modalContent}>
                <p>신청이 완료되었습니다.</p>
                <button className={styles.okBtn} onClick={closeSuccessModal}>
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>팀 정보를 불러오는 중...</p>
      )}
    </div>
  )
};

export default TeamDetail;