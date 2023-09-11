import React from 'react'
import {Link} from 'react-router-dom'
import { Box, useMediaQuery, useTheme } from '@material-ui/core';

const Goalddae = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
         <Box sx={{
            fontSize : isSmallScreen ? "15px" : "40px",
            marginLeft : isSmallScreen ? "8%" : "20%",
            marginTop : isSmallScreen ? "5%" : "3%"
            }}>
            <Box sx={{fontFamily:"Anton"}}>GOALDDAE</Box>
            <Box sx={{fontSize:"16px", marginTop:"2%", color:"#969696"}}>
                <Box sx={{fontSize : isSmallScreen ? "10px" : "14px"}}>풋살 & 축구, 골때에서 즐기세요.</Box>
                    <Box sx={{fontSize : isSmallScreen ? "10px" : "14px", marginTop : isSmallScreen ? "1%" : "5%"}}>
                        <Link to="/">이용 약관 | </Link>
                        <Link to="/">개인정보 처리방침 | </Link>
                        <Link to="/">사업자 정보 확인</Link>
                    <Box sx={{marginTop : isSmallScreen ? "1%" : "7%"}}>골때 | 서울특별시 강남구 역삼동 어딘가</Box>
                    <Box sx={{fontSize : isSmallScreen ? "10px" : "16px",marginTop:"1%"}}>EMAIL: goalddae0718@gamil.com | HELP: 02)000-0000-0000</Box>
                    <Box sx={{marginTop:"1%"}}>주식회사 골때컴퍼니 | 사업자번호 000-00-00000</Box>
                    <Box sx={{marginTop:"1%"}}>대표 : 박 신 유 재 김</Box>
                    <Box sx={{marginTop:"10%"}}>Copyright   GOALDDAE    All rights reserved.</Box>
                </Box>
            </Box>
        </Box>  
    </>
  )
}

export default Goalddae;
