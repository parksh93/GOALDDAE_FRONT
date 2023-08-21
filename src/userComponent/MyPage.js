import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser, UserProvider } from './userContext/UserContext';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';



function Mypage() {
  const { userInfo, setUserInfo } = useUser();
  const [ isEditing, setIsEditing ] = useState(false);
  const [rangeValue, setRangeValue] = useState(10);

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setRangeValue(value);
    handleInputChange('activityClass', value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };
  


  // 백엔드로 전달
  const handleSaveClick = async () => {

      const response = await axios.put('/user/update', userInfo);

      // 컨트롤러로 요청 넣는 부분
      console.log('업데이트 요청 응답 - status:', response.status, 'data:', response.data);
      
      if (response.status === 200) {
        setUserInfo(userInfo);
        setIsEditing(false);
        console.log('업데이트된 정보 : ' + JSON.stringify(userInfo));
      } else {
        console.error('수정 에러 : ', response.statusText);
      }
  };

  // 수정한 값 전달
  const handleInputChange = (key, value) => {
    setUserInfo(prev => ({ ...prev, [key]: value }));
  };
  
  // 유저정보 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('/user/getUserInfo');
        if (response.status === 200) {
          setUserInfo(response.data);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setUserInfo]);



  return (
    <UserProvider>
      <div className="my-page">
        <h2>마이페이지</h2>
        <div className="user-info">
          {userInfo ? (
            <React.Fragment>
              {isEditing ? (
                <React.Fragment>
                  닉네임 : <input type="text" defaultValue={userInfo.nickname} onChange={(e) => handleInputChange('nickname', e.target.value)} />
                  이메일 : <input type="text" defaultValue={userInfo.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                  전화번호 : <input type="text" defaultValue={userInfo.phoneNumber} onChange={(e) => handleInputChange('phoneNumber', e.target.value)} />
                  생년월일 : <input type="text" defaultValue={userInfo.birth} onChange={(e) => handleInputChange('birth', e.target.value)} />
                  선호도시 : <input type="text" defaultValue={userInfo.preferredCity} onChange={(e) => handleInputChange('preferredCity', e.target.value)} />
                  선호지역 : <Form.Select defaultValue={userInfo.preferredArea} onChange={(e) => 
                    handleInputChange('preferredArea', e.target.value)}>
                      <option value="">선호지역을 선택하세요</option>
                      <option value="서울">서울</option>
                      <option value="경기">경기</option>
                      <option value="인천">인천</option>
                      <option value="강원">강원</option>
                      <option value="대전">대전</option>
                      <option value="충남">충남</option>
                      <option value="충북">충북</option>
                      <option value="대구">대구</option>
                      <option value="경북">경북</option>
                      <option value="부산">부산</option>
                      <option value="울산">울산</option>
                      <option value="경남">경남</option>
                      <option value="광주">광주</option>
                      <option value="전남">전남</option>
                      <option value="전북">전북</option>
                      <option value="제주">제주</option>
                            </Form.Select>
                            <h5>활동반경: {rangeValue}</h5>
                              <Form>
                                <Form.Group controlId="formRange">
                                  <Form.Label>Range</Form.Label>
                                  <Form.Range
                                    min="10"
                                    max="20"
                                    step="5"
                                    value={rangeValue}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Form>
                </React.Fragment>
              ) : (

                // 사용자 UI
                <React.Fragment>
                <Col xs={6} md={4}>
                  <Image src="holder.js/171x180" roundedCircle />
                </Col>
                  <p><b>{userInfo.nickname}</b></p>
                  <p>{userInfo.gender} </p>
                  <p>{userInfo.level} </p>
                  <p>이메일 : {userInfo.email} </p>
                  <p>생년월일 : {userInfo.birth} </p>
                  <p>전화번호 : {userInfo.phoneNumber} </p>
                  <p>선호도시 : {userInfo.preferredCity} </p>
                  <p>선호지역 : {userInfo.preferredArea} </p>
                  <p>활동반경 : {userInfo.activityClass} </p>
                  <p>노쇼횟수 : {userInfo.noshowCnt} </p>
                  <p>매치리스트 : {userInfo.match} </p>
                  <p>게시글리스트 : {userInfo.posts} </p>
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
