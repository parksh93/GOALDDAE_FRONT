import React from 'react'
import {Link} from 'react-router-dom'
import { Box, useMediaQuery, useTheme } from '@material-ui/core';


const ServiceField = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
        <Box sx= {{
            fontSize : isSmallScreen ? "12px" : "14px", 
            marginLeft : isSmallScreen ? "30%" : "3%",
            marginTop : isSmallScreen ? "5%" : "2%",
            }}>
            서비스 지역
                <Box sx={{
                    fontSize : isSmallScreen ? "4px" : "13px",
                    marginTop: isSmallScreen? "2%" : "13%",
                    color:"#969696"
                    }}>
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>서울</Box></Link>   
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>경기</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>인천</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>강원</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>대전</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>충남/세종</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>충북</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>대구</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>경북</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>부산</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>울산</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>경남</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>광주</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>전남</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>전북</Box></Link> 
                    <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>제주</Box></Link> 
                </Box>
        </Box>
    </>
  )
}

export default ServiceField;