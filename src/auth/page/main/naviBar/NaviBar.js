import React from 'react'
import { Box } from '@material-ui/core';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

const Menubar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <>
          <Box sx={{ padding:"12px", bgcolor:"#4BAF4B", color:"white", display: "flex",justifyContent:"center" }}>
            <Button sx={{ 
                    color:"white",
                    fontSize: isSmallScreen ? "12px" : "18px",
                    marginRight: isSmallScreen ? "8px" : "40px",
                    paddingX: isSmallScreen ? "10px" : "50px"
                }}>매치
            </Button>
            <Button sx={{ 
                    color:"white",
                    fontSize: isSmallScreen ? "12px" : "18px",
                    marginRight: isSmallScreen ? "8px" : "40px",
                    paddingX: isSmallScreen ? "10px" : "50px"
                }}>팀
            </Button>
            <Button sx={{ 
                    color:"white",
                    fontSize: isSmallScreen ? "12px" : "18px",
                    marginRight: isSmallScreen ? "8px" : "40px",
                    paddingX: isSmallScreen ? "10px" : "50px"
                }}>구장예약
            </Button>
            <Button sx={{ 
                    color:"white",
                    fontSize: isSmallScreen ? "12px" : "18px",
                    marginRight: isSmallScreen ? "8px" : "40px",
                    paddingX: isSmallScreen ? "10px" : "50px"
                }}
                onClick={() => navigate('/board')}
                >게시판
            </Button>
            <Button sx={{ 
                    color:"white",
                    fontSize: isSmallScreen ? "12px" : "18px",
                    marginRight: isSmallScreen ? "8px" : "40px",
                    paddingX: isSmallScreen ? "10px" : "50px"
                }}>핫이슈
            </Button>
       
        </Box>
    </>
    )
}

export default Menubar;
