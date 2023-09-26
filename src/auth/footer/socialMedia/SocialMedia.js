import React from 'react'
import {Link} from 'react-router-dom'
// import { div, useMediaQuery, useTheme } from '@material-ui/core';
import {useMediaQuery, useTheme} from '@material-ui/core';

const SocialMedia = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
       <div style= {{
            fontSize : isSmallScreen ? "12px" : "14px", 
            marginLeft : isSmallScreen ? "26%" : "3%",
            marginTop : isSmallScreen ? "5%" : "2%" }}>
            소셜 미디어
            <div style={{
                fontSize : isSmallScreen ? "4px" : "13px",
                marginTop: isSmallScreen? "2%" : "13%",
                color:"#969696"
                }}>
                <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>인스타그램</div></Link> 
                <Link to="/"><div style={{marginTop : isSmallScreen ? "1%" : "10%"}}>유튜브</div></Link> 
            </div>
        </div>
    </>
  )
}

export default SocialMedia;
