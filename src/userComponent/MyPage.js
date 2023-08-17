import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser, UserProvider } from './userContext/UserContext';

function Mypage() {
  const { userInfo, setUserInfo } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({});


  const handleEditClick = () => {
    // 수정 상태로 바꼈는지 로그
    console.log("Edit button clicked");

    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };


  // 백엔드로 수정 요청
  const handleSaveClick = async () => {

    // 로그 백엔드로 수정요청 잘들어갔는지 확인
    console.log("Save button clicked");

    try {
      const response = await axios.post('/user/update', editedUserInfo);

      // 로그 백엔드 응답 확인
      console.log('Backend response:', response.data);


      if (response.status === 200) {
        setUserInfo({ ...userInfo, ...editedUserInfo }); // 사용자 정보 업데이트
        setIsEditing(false);
      } else {
        console.error('Error updating user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleInputChange = (key, value) => {
    // 인풋값 변경 로그
    console.log(`Changing ${key} to ${value}`);

    setEditedUserInfo(prev => ({ ...prev, [key]: value }));
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
                  닉네임 : <input type="text" defaultValue={editedUserInfo.nickName || userInfo.nickName} onChange={(e) => handleInputChange('nickName', e.target.value)} />
                  이메일 : <input type="text" defaultValue={editedUserInfo.email || userInfo.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                  전화번호 : <input type="text" defaultValue={editedUserInfo.phoneNumber || userInfo.phoneNumber} onChange={(e) => handleInputChange('phoneNumber', e.target.value)} />
                  생년월일 : <input type="text" defaultValue={editedUserInfo.birth || userInfo.birth} onChange={(e) => handleInputChange('birth', e.target.value)} />
                  선호도시 : <input type="text" defaultValue={editedUserInfo.preferredCity || userInfo.preferredCity} onChange={(e) => handleInputChange('preferredCity', e.target.value)} />
                  선호지역 : <input type="text" defaultValue={editedUserInfo.preferredArea || userInfo.preferredArea} onChange={(e) => handleInputChange('preferredArea', e.target.value)} />
                  활동반경 : <input type="text" defaultValue={editedUserInfo.activityClass || userInfo.activityClass} onChange={(e) => handleInputChange('activityClass', e.target.value)} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p> 프로필사진 : <img src={userInfo.profilePicture} alt="프로필 사진" /></p>
                  <p>닉네임 : {userInfo.nickName} </p>
                  <p>이메일 : {userInfo.email} </p>
                  <p>성별 : {userInfo.gender} </p>
                  <p>레벨 : {userInfo.level} </p>
                  <p>생년월일 : {userInfo.birth} </p>
                  <p>전화번호 : {userInfo.phoneNumber} </p>
                  <p>노쇼횟수 : {userInfo.noshowCnt} </p>
                  <p>매치리스트 : {userInfo.match} </p>
                  <p>게시글리스트 : {userInfo.posts} </p>
                  <p>선호도시 : {userInfo.preferredCity} </p>
                  <p>선호지역 : {userInfo.preferredArea} </p>
                  <p>활동반경 : {userInfo.activityClass} </p>
                  <p>친구리스트 : {userInfo.friendsList} </p>
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <p>로딩중...</p>
          )}
        </div>

        <div className="buttons">
          {isEditing ? (
            <React.Fragment>
              <button onClick={handleCancelClick}>취소</button>
              <button onClick={handleSaveClick}>저장</button>
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
