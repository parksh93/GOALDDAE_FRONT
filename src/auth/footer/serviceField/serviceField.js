import React from 'react'
import {Link} from 'react-router-dom'
import {useMediaQuery, useTheme} from '@material-ui/core';


const ServiceField = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
        <div style= {{
            fontSize : isSmallScreen ? "12px" : "14px", 
            marginLeft : isSmallScreen ? "30%" : "3%",
            marginTop : isSmallScreen ? "5%" : "2%",
            }}>
            서비스 지역
                <div style={{
                    fontSize : isSmallScreen ? "4px" : "13px",
                    marginTop: isSmallScreen? "2%" : "13%",
                    color:"#969696"
                    }}>
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>서울</div></Link>   
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>경기</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>인천</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>강원</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>대전</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>충남/세종</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>충북</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>대구</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>경북</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>부산</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>울산</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>경남</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>광주</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>전남</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>전북</div></Link> 
                    <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>제주</div></Link> 
                </div>
        </div>
    </>
  )
}

export default ServiceField;