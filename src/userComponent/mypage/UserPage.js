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
import { Link, useParams  } from 'react-router-dom';
import MatchList from './MatchList';
import BoardList from './BoardList';
import Userpage_FriendMain from '../mypage/friend/Userpage_FriendMain';
import editIcon from '../mypage/img/write.png';


function UserPage() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [viewMode, setViewMode] = useState('USER_INFO');
  

  
  // 유저정보 조회
  useEffect(() => {
    const fetchUserData = async () => {
        const response = await axios.post(`/user/getFriendInfo/${userId}`);
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
                  <Userpage_FriendMain />
                  ) : (
                    <>
                    <div className='user-card-1'>
                    <Col xs={6} md={4}>
                    <>
                    <img src={userInfo.profileImgUrl} roundedCircle />
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
                          <span style={{ color: userInfo.noShowCnt > 0 ? 'red' : 'gray' }}>
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