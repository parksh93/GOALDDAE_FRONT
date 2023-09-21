import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser, UserProvider } from '../userContext/UserContext';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import "./MyPage.css";
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
import { useParams, useNavigate } from 'react-router-dom';
import MatchList from './MatchList';
import BoardList from './BoardList';
import Userpage_FriendMain from '../mypage/friend/Userpage_FriendMain';
import editIcon from '../mypage/img/write.png';


function UserPage() {
  const { userId } = useParams();
  const [pageInfo, setPageInfo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [viewMode, setViewMode] = useState('USER_INFO');
  const navigate = useNavigate();
  // const loggedInUserId = useUser().id;
  const {userInfo, getUserInfo} = useUser();
  
  // 유저정보 조회
  useEffect(() => {
    getUserInfo();
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
      const response = await axios.post(`/user/getFriendInfo/${userId}`);
      if (response.status === 200) {
        setPageInfo(response.data);
        setImageUrl(response.data.profile_img_url);
      } else {
        console.error('에러 : ', response.statusText);
      }
  };

  // 만약 URL의 userId가 현재 로그인한 사용자의 ID와 일치하면, 사용자 정보를 보여주기 위해 뷰 모드를 변경합니다.
  useEffect(() => {
    if(userInfo !== null){
      if (userId == userInfo.id) {
        navigate('/myPage');
      }
    }
  }, [userInfo]);


  return (
    <UserProvider>    
    <div className="my-page">

        <div className="user-card">
          {pageInfo ? (
            <React.Fragment>
                <React.Fragment>

                {/* 사이드메뉴 */}
                <div style={{position: 'absolute'}}> 
                <Box sx={{ position: 'relative', top: '110px', left: '80px', width: '100%', maxWidth: '320px', bgcolor: 'background.paper', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', transform: 'translate(20px, 20px)' }}>
                <List component="nav" aria-label="side-nav" className="side-nav">
                <ListItem button onClick={() => setViewMode('USER_INFO')}
                sx={{ backgroundColor: viewMode === "USER_INFO" ? " #f2f2f2" : "inherit", color:viewMode === "USER_INFO" ? "black" : "inherit"}}>
                  <ListItemText primary="친구 정보" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setViewMode('MATCH_LIST')}
                sx={{ backgroundColor: viewMode === "MATCH_LIST" ? "green" : "inherit", color:viewMode === "MATCH_LIST" ? "white" : "inherit"}}>
                  <ListItemText primary="친구가 신청한 매치" />
                </ListItem>
                <Divider />
                <ListItem button divider onClick={() => setViewMode('BOARD_LIST')}
                sx={{ backgroundColor: viewMode === "BOARD_LIST" ? "green" : "inherit", color:viewMode === "BOARD_LIST" ? "white" : "inherit"}}>
                  <ListItemText primary="친구가 쓴 글" />
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
                  <MatchList userId={pageInfo.id}/>
                ) : viewMode === "BOARD_LIST" ? (
                  <BoardList userId={pageInfo.id} /> 
                ) : viewMode === "FRIEND_LIST" ? (
                  <Userpage_FriendMain userId={userId}/>
                  ) : (
                    <>
                    <div className='user-card-1'>
                    <Col xs={6} md={4}>
                    <>
                    <img src={pageInfo.profileImgUrl} roundedCircle />
                    </>
                    </Col>

                      <div className='userInfo'>
                        <div className='level'>
                          <Stack spacing={1} alignItems="center">
                            <Chip label={pageInfo.level} color="success" />
                          </Stack>
                        </div>
                        <span>{pageInfo.nickname}</span>
                        <p style={{ marginTop:'15px', marginBottom: '15px'}}>{pageInfo.gender}</p>
                        <p>노쇼 횟수 : 
                          <span style={{ color: pageInfo.noShowCnt > 0 ? 'green' : 'gray' }}>
                            {' ' + pageInfo.noShowCnt }
                          </span>회
                        </p>
                      </div>
                    </div> 

                    <div className='user-card-2'>
                      <p><b>이메일</b><text>{pageInfo.email}</text></p>
                      <p style={{ marginTop:'20px', marginBottom: '20px'}}><b>생년월일</b><span>{pageInfo.birth}</span></p>
                      <p><b>전화번호</b><span>{pageInfo.phoneNumber}</span></p>
                    </div>

                    <div className='user-card-3'>
                    <p><b>선호도시</b>  <span>{pageInfo.preferredCity}</span> </p>
                    <p style={{ marginTop:'20px', marginBottom: '20px'}}><b>선호지역</b>  <span>{pageInfo.preferredArea}</span> </p>
                    <p><b>활동반경</b>  <span>{pageInfo.activityClass}</span> km </p>
                    </div>
                  </>
                  )}

                </div>
                
                </React.Fragment>
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