import React, { useState } from 'react';
import axios from 'axios';

function Mypage() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  // 나중에 기본프로필로 변경
  const [profilePicture, setProfilePicture] = useState(null);

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];

    // 프로필 사진 업로드 관련 로직
    setProfilePicture(URL.createObjectURL(file));
  };

   // 회원 정보 업데이트 함수 (백엔드 통신 필요)
  const handleUpdateProfile = () => {
    const updatedUserName = '새로운 이름';
    const updatedEmail = '새로운 이메일';

    // 서버로 전송할 데이터
  const requestData = {
      newUserName: updatedUserName,
      newEmail: updatedEmail
    };

    // 서버로 데이터 전송
  axios.put('/user/updateUserInfo', requestData)
      .then(response => {
        // 성공적으로 업데이트된 경우 상태 업데이트
        setUserName(updatedUserName);
        setEmail(updatedEmail);
        console.log("성공적으로 수정 됐습니다!");
      })
      .catch(error => {
        // 에러 처리 로직 추가
        console.error('유저 정보 업데이트 실패:', error);
      });
  };

  return (
    <div className="my-page">
      <h2>마이페이지</h2>
      <div className="user-info">
        {profilePicture && <img src={profilePicture} alt="Profile" />}
        <label>
          프로필사진 :
          <input type="file" accept="image/*" onChange={handlePictureUpload} />
        </label>
        <label>
          이름 : 
          <input type="text" value={userName} onChange={handleNameChange} />
        </label>
        <label>
          이메일 : 
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>

        <button onClick={handleUpdateProfile}>수정</button>

      </div>
    </div>
  );
}

export default Mypage;