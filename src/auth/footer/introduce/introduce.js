import React from 'react'
import {Link} from 'react-router-dom'
import { Box, useMediaQuery, useTheme } from '@material-ui/core';

const Introduce = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
        <Box sx= {{
            fontSize : isSmallScreen ? "12px" : "14px", 
            marginLeft : isSmallScreen ? "10%" : "5%",
            marginTop : isSmallScreen ? "5%" : "2%" }}>
            골때
            <Box sx={{fontSize : isSmallScreen ? "4px" : "13px", marginTop: isSmallScreen? "2%" : "13%", color:"#969696"}}>
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>골때 소개</Box></Link>   
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>공지사항</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>자주 묻는 질문</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>매거진</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>매니저 지원</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>구장 제휴</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>채용</Box></Link> 
            </Box>
        </Box>
    </>
  )
}

export default Introduce;
