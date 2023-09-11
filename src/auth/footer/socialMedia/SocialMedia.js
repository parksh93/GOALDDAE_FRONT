import React from 'react'
import {Link} from 'react-router-dom'
import { Box, useMediaQuery, useTheme } from '@material-ui/core';

const SocialMedia = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
       <Box sx= {{
            fontSize : isSmallScreen ? "12px" : "14px", 
            marginLeft : isSmallScreen ? "26%" : "3%",
            marginTop : isSmallScreen ? "5%" : "2%" }}>
            소셜 미디어
            <Box sx={{
                fontSize : isSmallScreen ? "4px" : "13px",
                marginTop: isSmallScreen? "2%" : "13%",
                color:"#969696"
                }}>
                <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>인스타그램</Box></Link> 
                <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>유튜브</Box></Link> 
            </Box>
        </Box>
    </>
  )
}

export default SocialMedia;
