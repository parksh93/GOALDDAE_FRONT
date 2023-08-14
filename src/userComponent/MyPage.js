import React, { useState } from 'react';
import axios from 'axios';
import {UserProvider} from "./userComponent/userContext/UserContext";

function Mypage() {

  // 조회
  const [profilePicture, setProfilePicture] = useState(null);
  const [nickName, setnickName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [level, setLevel] = useState('');
  const [birth, setBirth] = useState('');
  const [noshowCnt, setNoshowCnt] = useState('');
  const [match, setMatch] = useState('');
  const [posts, setPosts] = useState('');
  const [preferredCity, setPreferredCity] = useState('');
  const [preferredArea, setPreferredArea] = useState('');
  const [activityClass, setActivityClass] = useState('');
  const [friendsList, setFriendsList] = useState('');

  // 수정
  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };
  const handleNickNameChange = (event) => {
    setnickName(event.target.value);
  };
  const handlEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };
  const handleBirthChange = (event) => {
    setBirth(event.target.value);
  };
  const handleNoshowCntChange = (event) => {
    setNoshowCnt(event.target.value);
  };
  const handleMatchChange = (event) => {
    setMatch(event.target.value);
  };
  const handlePostsChange = (event) => {
    setPosts(event.target.value);
  };
  const handlePreferredCityChange = (event) => {
    setPreferredCity(event.target.value);
  };
  const handlePreferredAreaChange = (event) => {
    setPreferredArea(event.target.value);
  };
  const handleActivityClassChange = (event) => {
    setActivityClass(event.target.value);
  };
  const handleFriendsListChange = (event) => {
    setFriendsList(event.target.value);
  };



const [isEditing, setIsEditing] = useState(false); // 현재 수정 모드인지 여부
const [editingField, setEditingField] = useState(''); // 수정 중인 항목을 저장할 상태


  // 수정 모드 토글 함수
  const toggleEditMode = (field) => {
    if (isEditing && editingField === field) {
      setIsEditing(false);
      setEditingField('');
    } else {
      setIsEditing(true);
      setEditingField(field);
    }
  };


// 저장 함수 (이곳에서 서버로 정보 업데이트 요청을 보낼 수 있음)
const saveChanges = () => {
  setIsEditing(false);
// 서버로 정보 업데이트 요청 등 추가 작업 수행
};



  return (
    <div className="my-page">
      <h2>마이페이지</h2>
      <div className="user-info">
        {/* 프로필사진 */}
        {profilePicture && <img src={profilePicture} alt="Profile" />}
        {isEditing  ? (
          <>
          프로필사진 :
            <input type="file" accept="image/*" onChange={handlePictureUpload} />
            <button onClick={toggleEditMode}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </>
        ) : (
          <label>
            프로필사진 :
            <button onClick={toggleEditMode}>수정</button>
          </label>
        )}

        {/* 이름 */}
        {isEditing && editingField === 'nickName' ? (
          <>
          이름 :
            <input type="text" value={nickName} onChange={handleNickNameChange} />
            <button onClick={toggleEditMode}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </>
        ) : (
          <label>
            이름 :
            {nickName}
            <button onClick={toggleEditMode}>수정</button>
          </label>
        )}

        {/* 이메일 */}
        {isEditing ? (
          <>
          이메일 :
            <input type="email" value={email} onChange={handlEmailChange} />
            <button onClick={toggleEditMode}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </>
        ) : (
          <label>
            이메일 :
            {email}
            <button onClick={toggleEditMode}>수정</button>
          </label>
        )}

        {/* 성별 */}
        {isEditing ? (
          <>
          성별 :
            <input type="text" value={gender} onChange={handleGenderChange} />
            <button onClick={toggleEditMode}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </>
        ) : (
          <label>
            성별 :
            {gender}
            <button onClick={toggleEditMode}>수정</button>
          </label>
        )}

       {/* 레벨 */}
       {isEditing ? (
          <> 레벨 : 
            <input type="text" value={level} onChange={handleLevelChange} />
            <button onClick={() => toggleEditMode('')}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </>
        ) : (
          <label>
            레벨 :
            {level}
            <button onClick={() => toggleEditMode('level')}>수정</button>
          </label>
        )}

        {/* 생년월일 */}
        {isEditing  ? (
          <> 생년월일 :
            <input type="text" value={birth} onChange={handleBirthChange} />
            <button onClick={() => toggleEditMode('')}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </>
        ) : (
          <label>
            생년월일 :
            {birth}
            <button onClick={() => toggleEditMode('birth')}>수정</button>
          </label>
        )}

        {/* 노쇼횟수 */}
        {isEditing ? (
          <> 노쇼횟수
            <input type="text" value={noshowCnt} onChange={handleNoshowCntChange} />
            <button onClick={() => toggleEditMode('')}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </>
        ) : (
          <label>
            노쇼횟수 :
            {noshowCnt}
            <button onClick={() => toggleEditMode('noshowCnt')}>수정</button>
          </label>
        )}

        {/* 매치리스트 */}
        {isEditing  ? (
          <> 매치리스트 :
            <input type="text" value={match} onChange={handleMatchChange} />
            <button onClick={() => toggleEditMode('')}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </>
        ) : (
          <label>
            매치리스트 :
            {match}
            <button onClick={() => toggleEditMode('match')}>수정</button>
          </label>
        )}

        {/* 게시글리스트 */}
        {isEditing  ? (
          <> 게시글리스트 : 
            <input type="text" value={posts} onChange={handlePostsChange} />
            <button onClick={() => toggleEditMode('')}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </>
        ) : (
          <label>
            게시글리스트 :
            {posts}
            <button onClick={() => toggleEditMode('posts')}>수정</button>
          </label>
        )}

        {/* 선호도시 */}
        {isEditing  ? (
          <> 선호도시 :
            <input type="text" value={preferredCity} onChange={handlePreferredCityChange} />
            <button onClick={() => toggleEditMode('')}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </>
        ) : (
          <label>
            선호도시 :
            {preferredCity}
            <button onClick={() => toggleEditMode('preferredCity')}>수정</button>
          </label>
        )}

          {/* 선호지역 */}
          {isEditing  ? (
          <> 선호지역 :
            <input type="text" value={preferredArea} onChange={handlePreferredAreaChange} />
            <button onClick={() => toggleEditMode('')}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </>
        ) : (
          <label>
            선호지역 :
            {preferredArea}
            <button onClick={() => toggleEditMode('preferredArea')}>수정</button>
          </label>
        )}

        {/* 활동반경 */}
        {isEditing  ? (
          <> 활동반경 :
            <input type="text" value={activityClass} onChange={handleActivityClassChange} />
            <button onClick={() => toggleEditMode('')}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </>
        ) : (
          <label>
            활동반경 :
            {activityClass}
            <button onClick={() => toggleEditMode('activityClass')}>수정</button>
          </label>
        )}

        {/* 친구리스트 */}
        {isEditing ? (
          <> 친구리스트 :
            <input type="text" value={friendsList} onChange={handleFriendsListChange} />
            <button onClick={() => toggleEditMode('')}>취소</button>
            <button onClick={saveChanges}>저장</button>
          </> 
        ) : (
          <label>
            친구리스트 :
            {friendsList}
            <button onClick={() => toggleEditMode('friendsList')}>수정</button>
          </label>
        )}

      </div>
    </div>
  );
}

export default Mypage;