import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MyPage.css';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: '0px 2px 14px 0px rgba(0, 0, 0, 0.2)'
}));

function Setting({ userId, userInfo }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);   

  // 다이얼로그 열기
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // 다이얼로그 닫기
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // 회원탈퇴
  const handleDeleteAccount = async (event) => {
    event.preventDefault();
  
    const confirmed = window.confirm("정말로 탈퇴하시겠습니까?");
    if (confirmed) {
      try {
        await axios.post('/user/logout');
        await axios.post(`/user/deleteAccount/${userId}`);
        window.location.href = '/'; 
        
      } catch (error) {
        console.error("회원 탈퇴 중 오류가 발생했습니다. :", error);
        console.log(userId);
      }
    }
  };

  
  return (
    <div className="user-card-setting">
      <Box sx={{ width: '100%' }}>
        <Stack>
          <div style={{ marginBottom: '40px'}}>
          <Item>
            <Link to={`/myPage/changePassword/${userId}`} className="button-link">
              <text className="button-1" style={{ fontWeight: 'bold', fontSize: '16px', color: '#b6b6b6'}}>
                비밀번호 변경하기
              </text>
            </Link>
          </Item>
          </div>
          <div style={{ marginBottom: '40px'}}>
          <Item>
            <text
              className="button-2"
              style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', color: '#b6b6b6' }}
              onClick={openDialog}
            >
              회원 탈퇴하기
            </text>
          </Item>
          </div>
          <Dialog
            open={isDialogOpen}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">회원 탈퇴</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                정말로 탈퇴하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color="primary">
                취소
              </Button>
              <Button onClick={handleDeleteAccount} color="primary">
                확인
              </Button>
            </DialogActions>
          </Dialog>
          {/* 다이얼로그 */}
          <div style={{ marginBottom: '40px'}}>
          <Item>
            <Link to="#" style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', color: '#b6b6b6' }}>
              서비스 이용약관
            </Link>
          </Item>
          </div>
          <div style={{ marginBottom: '40px'}}>
          <Item>
            <Link to="#" style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', color: '#b6b6b6' }}>
              개인정보 처리방침
            </Link>
          </Item>
          </div>
          <div style={{ marginBottom: '40px'}}>
          <Item>
            <Link to="#" style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', color: '#b6b6b6' }}>
              골때 고객센터
            </Link>
          </Item>
          </div>
        </Stack>
      </Box>
    </div>
  );
}

export default Setting;
