import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser, UserProvider } from '../userContext/UserContext';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import "./MyPage.css";
import profileImg from '../mypage/img/goalddae_default_profile.Webp';
import Nav from 'react-bootstrap/Nav';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import shadows from '@mui/material/styles/shadows';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import MatchList from './MatchList';
import BoardList from './BoardList';
import FriendList from './FriendList';
import editIcon from '../mypage/img/write.png';


function UserPage() {
  const [userInfo, setUserInfo] = useState("");
  const [chosenFile, setChosenFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [ isEditing, setIsEditing ] = useState(false);
  const [rangeValue, setRangeValue] = useState(10);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [nicknameChanged, setNicknameChanged] = useState(false);
  const [availableAreas, setAvailableAreas] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewMode, setViewMode] = useState('USER_INFO');

  const seoulAreas = ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"];
  const gyeonggiAreas = ["가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "하남시", "화성시"];
  const incheonAreas = ["강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"];
  const gangwonAreas = ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"];
  const daejeonAreas = ["동구", "중구", "서구", "유성구", "대덕구"];
  const chungnamAreas = ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "연기군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"];
  const chungbukAreas = ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군"];
  const daeguAreas = ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군"];
  const gyeongbukAreas = ["포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"];
  const busanAreas = ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"];
  const ulsanAreas = ["중구", "남구", "동구", "북구", "울주군"];
  const gyeongnamAreas = ["창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"];
  const gwangjuAreas = ["동구", "서구", "남구", "북구", "광산구"];
  const jeonnamAreas = ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"];
  const jeonbukAreas = ["전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"];
  const jejuAreas = ["제주시", "서귀포시"];



  // 프로필사진 수정
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setChosenFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
    
  if (!chosenFile) {
    console.error('파일이 선택되지 않았습니다.');
    return;
  }

    try {
      const formData = new FormData();
      formData.append('file', chosenFile);

      await axios.post('user/profileImg', formData,  { params: userInfo });
      console.log('파일 전송 성공!');
      setProfileImageUrl(URL.createObjectURL(chosenFile));

      window.location.reload();

    } catch (error) {
      console.error('파일 전송 실패!', error);
    }
  };


  // 프로필사진 조회
  useEffect(() => {
    async function fetchProfileImageUrl() {
      try {
        const response = await axios.get('/user/profileImgUrl');
        setProfileImageUrl(response.data);
      } catch (error) {
        console.error('Failed to fetch profile image URL', error);
      }
    }

    fetchProfileImageUrl();
  }, []);



  // 선호도시 변경시, 선호지역 및 활동반경 초기화
  const handleCityAreaChange = (event) => {
    const preferredCity = event.target.value;
    let availableAreas = [];

    handleInputChange('preferredCity', preferredCity);
    handleInputChange('preferredArea', '');

    if (preferredCity === '서울') {
      availableAreas = seoulAreas;
    } else if (preferredCity === '경기') {
      availableAreas = gyeonggiAreas;
    } else if(preferredCity === '인천') {
      availableAreas = incheonAreas;
    } else if (preferredCity === '강원') { 
        availableAreas = gangwonAreas;
    } else if (preferredCity === '대전') {
        availableAreas = daejeonAreas;
    } else if (preferredCity === '충남') {
        availableAreas = chungnamAreas;
    } else if (preferredCity === '충북') {
        availableAreas = chungbukAreas;
    } else if (preferredCity === '대구') {
        availableAreas = daeguAreas;
    } else if (preferredCity === '경북') {
        availableAreas = gyeongbukAreas;
    } else if (preferredCity === '부산') {
        availableAreas = busanAreas;
    } else if (preferredCity === '울산') {
        availableAreas = ulsanAreas;
    } else if (preferredCity === '경남') {
        availableAreas = gyeongnamAreas;
    } else if (preferredCity === '광주') {
        availableAreas = gwangjuAreas;
    } else if (preferredCity === "전남") {
         availableAreas = jeonnamAreas;
    } else if (preferredCity === "전북") {
        availableAreas = jeonbukAreas;
    } else if (preferredCity === "제주") {
        availableAreas = jejuAreas;
    } else {
      availableAreas = [];
    }
    setAvailableAreas(availableAreas);

    if (preferredCity === '') {
      handleInputChange('preferredCity', '');
      handleInputChange('activityClass', 0);
      handleInputChange('preferredArea', ''); 
      setRangeValue(0);
      
    } else {
      handleInputChange('preferredCity', event.target.value);
    }
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);

      if (userInfo.preferredCity === '') {
      return;
      }

      setRangeValue(value);
      handleInputChange('activityClass', value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleCancelClick = () => {
    setIsEditing(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // 닉네임 중복체크
  const handleDuplicateCheck = async () => {
    const response = await axios.post('/user/checkNickname', {nickname: userInfo.nickname});

    if (response.status === 200) {
      setIsDuplicate(response.data[0]);

      if (response.data[0]) {
        alert('사용 가능한 닉네임입니다.');
        setIsDuplicate(true);
      } else {
        alert('이미 사용중인 닉네임입니다.');
         setIsDuplicate(false);
      }
    } else {
      console.error('닉네임 중복 확인 에러 : ', response.statusText);
    }
}

  // 백엔드로 수정사항 전달
  const handleSaveClick = async () => {
    if(nicknameChanged && !isDuplicate){
      alert("닉네임 중복체크를 해주세요!");
    return;
  }

      const response = await axios.put('/user/update', userInfo);
      
      if (response.status === 200) {
        setUserInfo(userInfo);
        setIsEditing(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        console.error('수정된 정보가 전달이 안됐어요! : ', response.statusText);
      }
  };
  

  // 유저정보 수정
  const handleInputChange = (key, value) => {
    if(key === "nickname"){
      setIsDuplicate(false);
      setNicknameChanged(true);
    }
    setUserInfo(prev => ({ ...prev, [key]: value }));
  };
  
  // 유저정보 조회
  useEffect(() => {
    const fetchUserData = async () => {
        const response = await axios.post('/user/getUserInfo');
        if (response.status === 200) {
          setUserInfo(response.data);
          setImageUrl(response.data.profile_img_url);
        } else {
          console.error('에러 : ', response.statusText);
        }
    };
    fetchUserData();
  }, [setUserInfo]);



  return (
    <UserProvider>    
    <div className="my-page">

        <div className="user-card">
          {userInfo ? (
            <React.Fragment>
              {isEditing ? (
                <React.Fragment>

                  {/* 사용자 수정 페이지 */}
                  <div className='user-card-modify'> 

                  <div className='inline-form'>   
                  <b>닉네임</b><p><TextField id={userInfo.nickname}
                                            defaultValue={userInfo.nickname}
                                            onChange={(e) => handleInputChange('nickname', e.target.value)} /></p>    
                                            
                  <Button style={{borderColor: 'grey', color: 'grey', marginRight: '10px', height: '30px'}}
                          variant="outlined"
                          onClick={handleDuplicateCheck}>
                          중복체크
                  </Button>
                  </div><p></p>

                  <b>전화번호</b><p><TextField id={userInfo.phoneNumber}
                                            defaultValue={userInfo.phoneNumber}
                                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)} /></p> 
                    <b>선호도시</b><p> <Select
                    labelId="선호도시"
                    id="select-preferredCity"
                    value={userInfo.preferredCity}
                    onChange={handleCityAreaChange}
                    style={{ outline: '1px solid #f4f4f4', outlineOffset: '-2px' }}
                    >
                   
                    <MenuItem value={""}>선택안함</MenuItem>
                    <MenuItem value={"서울"}>서울</MenuItem>
                    <MenuItem value={"경기"}>경기</MenuItem>
                    <MenuItem value={"인천"}>인천</MenuItem>
                    <MenuItem value={"강원"}>강원</MenuItem>
                    <MenuItem value={"대전"}>대전</MenuItem>
                    <MenuItem value={"충남"}>충남</MenuItem>
                    <MenuItem value={"충북"}>충북</MenuItem>
                    <MenuItem value={"대구"}>대구</MenuItem>
                    <MenuItem value={"경북"}>경북</MenuItem>
                    <MenuItem value={"부산"}>부산</MenuItem>
                    <MenuItem value={"울산"}>울산</MenuItem>
                    <MenuItem value={"경남"}>경남</MenuItem>
                    <MenuItem value={"광주"}>광주</MenuItem>
                    <MenuItem value={"전남"}>전남</MenuItem>
                    <MenuItem value={"전북"}>전북</MenuItem>
                    <MenuItem value={"제주"}>제주</MenuItem>
                  
                  </Select></p>

                  <b>선호지역</b>
                  <p>                  
                    <Select
                      labelId="선호지역"
                      id="select-preferredArea"
                      value={userInfo.preferredArea}
                      defaultValue={userInfo.preferredArea}
                      onChange={(e) => handleInputChange('preferredArea', e.target.value)}
                      style={{ outline: '1px solid #f4f4f4', outlineOffset: '-2px' }}
                    >
                      <MenuItem value={""}>선택안함</MenuItem>
                      {availableAreas.map(area => (
                        <MenuItem key={area} value={area}>
                          {area}
                        </MenuItem>
                      ))}
                    </Select>
                  </p>
                                <p>
                                <Form>
                                <Form.Group controlId="formRange">
                                  <Form.Label><b>활동반경</b></Form.Label>
                                  <Form.Range
                                    min="0"
                                    max="50"
                                    step="5"
                                    value={rangeValue}
                                    defaultValue={rangeValue}
                                    onChange={handleChange}
                                  /> {rangeValue}
                                </Form.Group>
                              </Form></p>

                    <div className="buttons-modify">
                      <div className='button-cancle' onClick={handleCancelClick}>취소</div>
                      <div className='button-save' onClick={handleSaveClick}>저장</div>
                    </div>

                </div>
                </React.Fragment>
              ) : (
                // 사용자 UI               
                <React.Fragment>

                {/* 사이드메뉴 */}
                <div style={{position: 'relative'}}> 
                <Box sx={{ position: 'relative', top: '110px', left: '80px', width: '100%', maxWidth: '320px', bgcolor: 'background.paper', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', transform: 'translate(20px, 20px)' }}>
                <List component="nav" aria-label="side-nav" className="side-nav">
                <ListItem button onClick={() => setViewMode('USER_INFO')}
                sx={{ backgroundColor: viewMode === "USER_INFO" ? " #f2f2f2" : "inherit", color:viewMode === "USER_INFO" ? "black" : "inherit"}}>
                  <ListItemText primary="내 정보" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setViewMode('MATCH_LIST')}
                sx={{ backgroundColor: viewMode === "MATCH_LIST" ? "green" : "inherit", color:viewMode === "MATCH_LIST" ? "white" : "inherit"}}>
                  <ListItemText primary="신청 매치" />
                </ListItem>
                <Divider />
                <ListItem button divider onClick={() => setViewMode('BOARD_LIST')}
                sx={{ backgroundColor: viewMode === "BOARD_LIST" ? "green" : "inherit", color:viewMode === "BOARD_LIST" ? "white" : "inherit"}}>
                  <ListItemText primary="내가 쓴 글" />
                </ListItem>
                <ListItem button onClick={() => setViewMode('FRIEND_LIST')}
                sx={{ backgroundColor: viewMode === "FRIEND_LIST" ? "green" : "inherit", color:viewMode === "FRIEND_LIST" ? "white" : "inherit"}}>
                  <ListItemText primary="친구" />
                </ListItem>
                </List>
                </Box>
                </div>

                <div className="user-cards-wrapper">

                {/* 사이드메뉴 상세보기 */}
                {viewMode === "MATCH_LIST" ? (
                  <MatchList userId={userInfo.id}/>
                ) : viewMode === "BOARD_LIST" ? (
                  <BoardList userId={userInfo.id} /> 
                ) : viewMode === "FRIEND_LIST" ? (
                  <FriendList />
                  ) : (
                    <>
                    <div className='user-card-1'>
                    <Col xs={6} md={4}>
                    {/* 이미지 수정 폼 */}
                    <>
                      <Image src={imageUrl || profileImageUrl || userInfo.profileImgUrl} roundedCircle />
                    {/* <form onSubmit={handleSubmit}>
                    <input type="file" style={{ display: "none" }} id="fileInput" onChange={handleFileChange} />
                    <label htmlFor="fileInput" className="profileImg-edit">
                    <img src={editIcon} alt="edit icon" style={{ width: "20px", height: "20px", borderRadius: "0" }} />
                    </label>
                    {chosenFile && (
                      <>
                        <button type="submit" className="profileImg-save">저장</button>
                        <button type="button" onClick={() => window.location.reload()} className="profileImg-cancel">취소</button>
                      </>
                    )}
                    </form> */}
                    </>
                    </Col>

                      <div className='userInfo'>
                        <div className='level'>
                          <Stack spacing={1} alignItems="center">
                            <Chip label={userInfo.level} color="success" />
                          </Stack>
                        </div>
                        <span>{userInfo.nickname}</span>
                        <p>{userInfo.gender}</p>
                        <p>노쇼 
                          <span style={{ color: userInfo.noShowCnt > 0 ? 'green' : 'gray' }}>
                            {userInfo.noShowCnt}
                          </span>
                        </p>
                      </div>
                    </div> 

                    <div className='user-card-2'>
                      <p><b>이메일</b><text>{userInfo.email}</text></p>
                      <p><b>생년월일</b><span>{userInfo.birth}</span></p>
                      <p><b>전화번호</b><span>{userInfo.phoneNumber}</span></p>
                    </div>

                    <div className='user-card-3'>
                    <p><b>선호도시</b>  <span>{userInfo.preferredCity}</span> </p>
                    <p><b>선호지역</b>  <span>{userInfo.preferredArea}</span> </p>
                    <p><b>활동반경</b>  <span>{userInfo.activityClass}</span> km </p>
                    </div>

                  {/* <div className="buttons">
                      <div className='button-modify' button onClick={handleEditClick}>수정</div>
                  </div> */}
                  </>
                  )}

                </div>
                
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <p>로딩중...</p>
          )}
        </div>
      </div>
    </UserProvider>
  );
}

export default UserPage;