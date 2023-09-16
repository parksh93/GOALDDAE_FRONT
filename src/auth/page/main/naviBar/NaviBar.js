import React from 'react'
import { Box } from '@material-ui/core';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NaviBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
        <Box sx={{ bgcolor:"#4BAF4B", color:"white", display: "flex", justifyContent:"center" }}>
          <Button 
            sx={{ 
                color:"white",
                fontSize: isSmallScreen ? "12px" : "15px",
                marginRight: isSmallScreen ? "8px" : "1px",
                paddingX: isSmallScreen ? "10px" : "50px",
                backgroundColor: location.pathname === '/' ? '#64CD3C' : 'transparent', 
                '&:hover': {backgroundColor: '#64CD3C'}
            }}onClick={() => navigate('/')}>개인매치
            </Button>

            <Button 
                sx={{ 
                    color:"white",
                    fontSize: isSmallScreen ? "12px" : "15px",
                    marginRight: isSmallScreen ? "8px" : "1px",
                    paddingX: isSmallScreen ? "10px" : "58px",
                    backgroundColor: location.pathname === '/match/team/list' ? '#64CD3C' : 'transparent', 
                    '&:hover': {backgroundColor: '#64CD3C'}
                }} onClick={() => navigate('/match/team/list')}>팀매치
            </Button>

            <Button 
                sx={{ 
                    color:"white",
                    fontSize: isSmallScreen ? "12px" : "15px",
                    marginRight: isSmallScreen ? "8px" : "1px",
                    paddingX: isSmallScreen ? "10px" : "68px",
                    backgroundColor: location.pathname === '/team/list' ? '#64CD3C' : 'transparent', 
                    '&:hover': {backgroundColor: '#64CD3C'}
                }} onClick={() => navigate('/team/list')}>팀
            </Button>

            <Button 
                sx={{ 
                color:"white",
                fontSize: isSmallScreen ? "12px" : "15px",
                marginRight: isSmallScreen ? "8px" : "1px",
                paddingX: isSmallScreen ? "10px" : "50px",
                backgroundColor: location.pathname === '/reservation/list' ? '#64CD3C' : 'transparent', 
                '&:hover': {backgroundColor: '#64CD3C'}
                }} onClick={() => navigate('/reservation/list')}>구장예약
            </Button>

            <Button 
                sx={{ 
                    color:"white",
                    fontSize: isSmallScreen ? "12px" : "15px",
                    paddingX: isSmallScreen ? "10px" : "58px",
                    backgroundColor: location.pathname === '/board' ? '#64CD3C' : 'transparent', 
                    '&:hover': {backgroundColor: '#64CD3C'}
                }} onClick={() => navigate('/board')}>게시판
            </Button>
        </Box>
    </>
    )
}

export default NaviBar;
