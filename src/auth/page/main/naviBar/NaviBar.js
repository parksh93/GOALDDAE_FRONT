import React from 'react'
import { Box } from '@material-ui/core';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate, useLocation } from 'react-router-dom';

const NaviBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  return (
      <>
        <Box sx={{ height: '50px', textAlign: "center", justifyContent:"center", boxShadow: "0 3px 3px -2.5px lightgray", paddingBottom: "10px", marginTop: "10px" }}>
            <Button 
                sx={{ 
                    color: "black",
                    height: "100%",
                    width: "10%",
                    fontSize: location.pathname === '/' ? "20px" : "17px",
                    fontWeight: location.pathname === '/' ? '600' : '0', 
                    '&:hover': {fontSize: '20px', background: "none"},
                    marginRight: "20px"
                }}onClick={() => navigate('/')}>개인매치
            </Button>

            <Button 
                sx={{ 
                    color:"black",
                    height: "100%",
                    width: "10%",
                    fontSize: location.pathname === '/match/team/list' ? "20px" : "17px",
                    fontWeight: location.pathname === '/match/team/list' ? '600' : '0', 
                    '&:hover': {fontSize: '20px', background: "none"},
                    marginRight: "20px"
                }} onClick={() => navigate('/match/team/list')}>팀매치
            </Button>

            <Button 
                sx={{ 
                    color:"black",
                    height: "100%",
                    fontSize: location.pathname === '/team/list' ? "20px" : "17px",
                    width: "10%",
                    fontWeight: location.pathname === '/team/list' ? '600' : '0', 
                    '&:hover': {fontSize: '20px', background: "none"},
                    marginRight: "20px"
                }} onClick={() => navigate('/team/list')}>팀
            </Button>

            <Button 
                sx={{ 
                color: "black",
                height: "100%",
                fontSize: location.pathname === '/reservation/list' ? "20px" : "17px",
                width: "10%",
                fontWeight: location.pathname === '/reservation/list' ? '600' : '0', 
                '&:hover': {fontSize: '20px', background: "none"},
                marginRight: "20px"
                }} onClick={() => navigate('/reservation/list')}>구장예약
            </Button>

            <Button 
                sx={{ 
                    color: "black",
                    height: "100%",
                    width: "10%",
                    fontSize: location.pathname === 'board' ? "20px" : "17px",
                    fontWeight: location.pathname === '/board' ? '600' : '0', 
                    '&:hover': {fontSize: '20px', background: "none"},
                    marginRight: "20px"
                }} onClick={() => navigate('/board')}>게시판
            </Button>   
          </Box>
      </>
    )
}

export default NaviBar;