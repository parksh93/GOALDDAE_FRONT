import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser, UserProvider } from './userContext/UserContext';

function Mypage() {
  const { userInfo, setUserInfo } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('/user/getUserInfo');
        if (response.status === 200) {
          setUserInfo(response.data); // 유저 정보 업데이트
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setUserInfo]); // setUserInfo를 의존성 배열에 추가

  return (
    <UserProvider>
      <div className="my-page">
        <h2>마이페이지</h2>
        <div className="user-info">
          {userInfo ? (
            <React.Fragment>
              {isEditing ? (
                <React.Fragment>
                  프로필사진 : <input type="file" />
                  닉네임 : <input type="text" defaultValue={userInfo.nickName} />
                  {/* ... */}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  프로필사진 : <img src={userInfo.profilePicture} alt="프로필 사진" />
                  닉네임 : {userInfo.nickName}
                  이메일 : {userInfo.email}
                  성별 : {userInfo.gender}
                  레벨 : {userInfo.level}
                  생년월일 : {userInfo.birth}
                  노쇼횟수 : {userInfo.noshowCnt}
                  매치리스트 : {userInfo.match}
                  게시글리스트 : {userInfo.posts}
                  선호도시 : {userInfo.preferredCity}
                  선호지역 : {userInfo.preferredArea}
                  활동반경 : {userInfo.activityClass}
                  친구리스트 : {userInfo.friendsList}
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <p>유저 정보를 불러오는 중...</p>
          )}
        </div>

        <div className="buttons">
          {isEditing ? (
            <React.Fragment>
              <button onClick={handleCancelClick}>취소</button>
              <button>저장</button>
            </React.Fragment>
          ) : (
            <button onClick={handleEditClick}>수정</button>
          )}
        </div>
      </div>
    </UserProvider>
  );
}

export default Mypage;
