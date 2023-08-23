import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const StyledButton = styled(Button)({
  backgroundColor: '#4caf50',
  border: 'none',
  color: 'white',
  padding: '6px 12px', 
   fontSize:'14px', 
   margin:'0px 10px',  
   '&:hover': {
    backgroundColor:'#367b3f'
   }
});

const Admin = () => {
 return (
 <>
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    height='30vh'
  >
    <h1>관리자 페이지</h1>
    
    <nav>
      <Link to="/admin/soccerField/save">
       <StyledButton>구장 등록</StyledButton>
      </Link>

      <Link to="/admin/soccerField/update">
       <StyledButton>구장 수정</StyledButton>
      </Link>

      <Link to="/admin/soccerField/delete">
        <StyledButton>구장 삭제</StyledButton>
      </Link>
     </nav>
   </Box>

 </>
 );
};

export default Admin;
