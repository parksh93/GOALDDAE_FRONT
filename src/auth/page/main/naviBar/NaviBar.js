import React from 'react'
import { Box } from '@material-ui/core';
import { Button } from '@mui/material';

const Menubar = () => {
  return (
    <>
        <Box sx={{ padding:"12px", bgcolor:"#4BAF4B", color:"white", display: "flex",justifyContent:"center" }}>
            <Button sx={{ color:"white", fontSize:"18px" }}>매치</Button>
            <Button sx={{ color:"white", fontSize:"18px" }}>팀</Button>
            <Button sx={{ color:"white", fontSize:"18px" }}>구장예약</Button>
            <Button sx={{ color:"white", fontSize:"18px" }}>자유게시판</Button>
            <Button sx={{ color:"white", fontSize:"18px" }}>핫이슈</Button>
        </Box>
    </>
    )
}

export default Menubar;
