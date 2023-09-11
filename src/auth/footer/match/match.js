import React from 'react'
import {Link} from 'react-router-dom'
import { Box, useMediaQuery, useTheme } from '@material-ui/core';

const Match = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
        <Box sx= {{
            fontSize : isSmallScreen ? "14px" : "14px",
            marginLeft : isSmallScreen ? "10%" : "5%",
            marginTop : isSmallScreen ? "5%" : "2%" 
            }}>
            매치
            <Box sx={{
                fontSize : isSmallScreen ? "5px" : "13px",
                marginTop: isSmallScreen? "2%" : "13%",
                color:"#969696"
                }}>
                <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>개인 매치</Box></Link>   
                <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>팀 매치</Box></Link> 
                <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>팀 가입하기</Box></Link> 
                <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>자유게시판</Box></Link> 
                <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>핫이슈</Box></Link> 
            </Box>
        </Box>
    </>
  )
}

export default Match;
