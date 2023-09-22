import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../userComponent/userContext/UserContext';
import styles from './Detail.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import TeamEditModal from './TeamEditModal';
import ProfileImageEdit from './ProfileImgEdit';
import Loading from '../../loading/Loading';


const MyTeamDetail = () => {
  const { userInfo } = useUser();
  const [teamInfo, setTeamInfo] = useState(null);
  const [isTeamManager, setIsTeamManager] = useState(false);
  const [error, setError] = useState(false);
  const { tabName } = useParams();
  const [selectedTab, setSelectedTab] = useState('info');
  const [applyList, setApplyList] = useState([]);
  const [memberList, setMemberList] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileImageEditOpen, setIsProfileImageEditOpen] = useState(false);
  const [editedTeamInfo, setEditedTeamInfo] = useState(null);

  const navigate = useNavigate();

  const cachedMemberLists = {}; 

  useEffect(() => {
    if (['info', 'recentMatch', 'reservMatch', 'memberList', 'applyList','leaveTeam'].includes(tabName)) {
      setSelectedTab(tabName);
    }
  }, [tabName]);

  // 내 팀 페이지
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

  // 멤버 리스트
  const fetchMemberList = (teamId) => {
    if(cachedMemberLists[teamId]) {
      setMemberList(cachedMemberLists[teamId]);
    } else {
      axios.get(`/teamMember/list?teamId=${teamId}`)
        .then(response => {
          setMemberList(response.data);
          cachedMemberLists[teamId] = response.data; // 데이터를 캐시에 저장
          console.log("팀원 정보 : ", response)
          
          setError(false);
        })
        .catch(error => {
          console.error('멤버 정보 가져오는 중 오류 발생: ', error);
          setError(true);
        })
    }
  }

  useEffect(()=> {
    if (userInfo){
      fetchMemberList(userInfo.teamId)
    }
  }, [userInfo]);

  // 가입신청 리스트
  const fetchApplyList = (teamId) => {
    axios.get(`/team/checkApply?teamId=${teamId}`)
      .then(response => {
        // 서버에서 받은 가입 신청 정보를 상태에 저장
        setApplyList(response.data);
        setError(false);
      })
      .catch(error => {
        console.error('가입 신청 정보를 가져오는 중 오류 발생:', error);
        setError(true);
      });
  };

  useEffect(() => {
    if (userInfo) {
      axios.get(`/teamMember/checkManager?userId=${userInfo.id}&teamId=${userInfo.teamId}`)
        .then(response => {
          console.log('팀 매니저 여부:', response.data);

          const isManager = response.data === 0;
          setIsTeamManager(isManager);
          
          // 팀 매니저 여부 확인 후, 팀 아이디를 사용하여 가입 신청 정보를 가져옴
          if (isManager) {
            fetchApplyList(userInfo.teamId);
          }
        })
        .catch(error => {
          console.error('팀 매니저 정보를 가져올 수 없습니다.', error);
        });
    }
  }, [userInfo]);

  // 팀원 강퇴
  const handleRemoveMember = (userId) => {
    console.log('handleRemoveMember 함수 호출됨'); 

    const requestData = {
      userId: userId,
      teamId: userInfo.teamId,
    }

    axios.delete(`/teamMember/remove`, {data: requestData,})
      .then(response => {
        console.log("remove response: ", response);

        fetchMemberList(userInfo.teamId);
      })
      .catch(error => {
        console.error(`팀원 삭제 실패`, error);
      });
  } 

  // 팀 탈퇴
  const handleLeaveTeam = (userId) => {
    const confirmation = window.confirm("정말로 팀을 탈퇴하시겠습니까?");
    if (confirmation) {
      
      axios.delete(`/teamMember/remove`, { data: { userId: userInfo.id, teamId: userInfo.teamId } })
        .then(response => {
          console.log("remove response: ", response);
          alert('정상적으로 탈퇴되었습니다.');

          navigate('/team/list');

          window.location.reload();
        })
        .catch(error => {
          console.error(`팀원 삭제 실패`, error);
        });

    } else {
      console.log('탈퇴 취소');
    }
  };

  // 가입수락
  const handleAccept = (apply) => {
    const requestData1 = {
      teamApplyDTO: {
        userId: apply.userId,
        teamId: apply.teamId,
        teamAcceptStatus: 1,
      },
      teamMemberDTO: {
        teamManager: 1,
        userId: apply.userId,
        teamId: apply.teamId,
      },
      getUserInfoDTO: {
        id: apply.userId,
        teamId: apply.teamId,
      },
    };
  
      axios.post('/team/acceptApply', requestData1)
      .then(response => {
      console.log("response : ", response)
      console.log(`가입 수락: ${apply.name}`);
      
      fetchApplyList(userInfo.teamId);
      })
      .catch(error=> {
        console.error('가입신청 수락 실패', error)
      })
      
  };
  
  // 가입 거절 
  const handleReject = (apply) => {
    axios.patch('/team/rejectApply', { userId: apply.userId,
                                       teamId: apply.teamId}
    )
      .then(response => {
        console.log("Response: ",response)
        console.log(`가입 거절: ${apply.name}`);
        
        fetchApplyList(userInfo.teamId);
      })
      .catch(error=> {
        console.error('가입신청 거절 실패', error)
      })
  };

  // tab 설정
  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);

    if (tabName === 'memberList' && userInfo) {
      fetchMemberList(userInfo.teamId);
    }

    if (tabName === 'applyList' && userInfo) {
      fetchApplyList(userInfo.teamId);
    }
  };

  // 수정 모달 열기
  const openEditModal = (teamInfo) => {
    setEditedTeamInfo(teamInfo);
    setIsEditModalOpen(true);
  };

  // 수정 모달 닫기
  const closeEditModal = () => {
    setEditedTeamInfo(null);
    setIsEditModalOpen(false);
  };

  // 프로필 이미지 수정 모달 열기
  const handleProfileImageEditOpen = (teamInfo) => {
    setEditedTeamInfo(teamInfo)
    setIsProfileImageEditOpen(true);
  };

  // 프로필 이미지 수정 모달 닫기
  const handleProfileImageEditClose = () => {
    setIsProfileImageEditOpen(false);
  };

  return (
    <div>
        {error ? (
        <p>가입한 팀을 확인할 수 없습니다.</p>
        ) : teamInfo ? (
      <div className={styles.myTeamContainer}>
        <div className={styles.myTeamLeftContainer}>
          <div className={styles.myTeamInfoContainer}>
              <h1 className={styles.myTeamProfile}>
              <div className={styles.myTeamCircularImageContainer}>
                <div className={styles.myTeamCircularImage}>
                  <img className={styles.teamProfileImgUrl} 
                      src={teamInfo.teamProfileImgUrl}
                      onClick={isTeamManager ? () => handleProfileImageEditOpen(teamInfo) : null}
                   />
                </div>
              </div>
                {teamInfo.teamName}
              </h1>          
              {isTeamManager && (
                <>
                  <button className={styles.teamDetailUpdateBtn} onClick={() => openEditModal(teamInfo)}>
                    팀 설정
                  </button>
                </>
              )}
          </div>
          <div className={styles.myTeamInfo}>
            <p>지역 | {teamInfo.area}</p>
            <p>평균나이 | {teamInfo.averageAge} 세</p>
            <p>입단비 | {teamInfo.entryFee} 원</p>
            <p>입단성별 | {teamInfo.entryGender}</p>
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
              className={`${styles.myTeamMemberFilter} ${selectedTab === 'memberList' ? styles.activeTab : ''}`}
              onClick={() => handleTabChange('memberList')}
            >
              팀원
            </button>
           
            {isTeamManager && (
            <button
              className={`${styles.myTeamApplyListFilter} ${selectedTab === 'applyList' ? styles.activeTab : ''}`}
              onClick={() => handleTabChange('applyList')}
            >
              가입신청
            </button>
            )}

            <button 
              className={`${styles.leaveTeamFilter} ${selectedTab === 'leaveTeam' ? styles.activeTab : ''}`}
              onClick={() => handleLeaveTeam(userInfo.userId)}>
              팀 탈퇴 {'>'}
            </button>
          
            </div>
              
          <div className={styles.myTeamBox}>
            {selectedTab === 'info' && (

              <div className={styles.myTeamInfoBox}>
                <p>지역 | {teamInfo.area}</p>
                <p>평균나이 | {teamInfo.averageAge} 세</p>
                <p>입단비 | {teamInfo.entryFee} 원</p>
                <p>입단성별 | {teamInfo.entryGender}</p>
                <p>선호시간 | {teamInfo.preferredTime} 시</p>
                <p>선호요일 | {teamInfo.preferredDay}</p>
                <p>모집여부 | {teamInfo.recruiting ? ' 모집중' : ' 모집종료'}</p>
                
                <div className={styles.myTeamIntroduce}>
                  {teamInfo.teamIntroduce !== null ? (
                    <div className={styles.myTeamIntroduceContent}>
                     {teamInfo.teamIntroduce}
                    </div>
                  ) : (
                    <p className={styles.noMyTeamIntroduce}> 팀 소개글이 없습니다. </p>
                  )}
                </div>

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

            {selectedTab === 'memberList' && (
              <div className={styles.myTeamMembers}>
                {memberList.map((member, memberIndex) => (
                  <div key={memberIndex}>

                    <div className={styles.teamMemberInfoContainer}>
                      <div className={styles.teamMemberCirclarImageContainer}>
                        <div className={styles.teamMemberCirclarImage}>
                          <img className={styles.teamMemberProfileImgUrl} src={member.ProfileImgUrl} alt={member.name}  />
                        </div>
                      </div>
                      <div className={styles.teamMemberInfo}>
                        <h3>{member.name} </h3>
                          <div className={styles.memberInfoRow}>
                            <span>{member.preferredCity}</span><span>{member.preferredArea}</span>
                          </div>
                      </div>
                      {userInfo.id !== member.userId && member.teamManager === 1 && (
                        <div className={styles.removeMember}>
                          <button className={styles.removeButton} onClick={() => handleRemoveMember(member.userId)}>강퇴</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
           {selectedTab === 'applyList' && (
              <div className={styles.myTeamApplyList}>
                {applyList.length === 0 ? (
                  <p>대기중인 가입신청이 없습니다.</p>
                ) : (
                  <div>
                    {applyList.map((apply, applyIndex) => (
                      <div key={applyIndex} className={styles.applyUserInfoContainer}>
                        <div className={styles.applyUserCircularImageContainer}>
                          <div className={styles.applyUserCircularImage}>
                            <img className={styles.applyUserProfileImgUrl} src={apply.ProfileImgUrl} alt={apply.name} />
                          </div>
                        </div> 
                        <div className={styles.applyUserInfo}>
                          <h3>{apply.name}</h3>
                          <div className={styles.applyUserInfoRow}>
                            <span>{apply.preferredCity}</span><span>{apply.preferredArea}</span>
                          </div>
                        </div>
                        <div className={styles.applyButtons}>
                              <button className={styles.acceptButtons} onClick={() => handleAccept(apply)}>수락</button>
                              <button className={styles.rejectButtons} onClick={() => handleReject(apply)}>거절</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          
          </div>
        </div>

      </div>
        ) : (
        <Loading />
      )}
      
      {/* 수정 모달 */}
      {isEditModalOpen && (
        <TeamEditModal
          open={isEditModalOpen}
          onClose={closeEditModal}
          teamInfo={editedTeamInfo}
          onSubmit={(updatedTeamInfo) => {
            console.log('업데이트된 팀 정보:', updatedTeamInfo);
            
            closeEditModal();
          }}
        />
      )}

      {/* 프로필 이미지 수정 모달 */}
      {isProfileImageEditOpen && (
        <ProfileImageEdit
          onCancel={handleProfileImageEditClose}
          teamInfo={editedTeamInfo}
        />
      )}

    </div>
    
  );
};

export default MyTeamDetail;