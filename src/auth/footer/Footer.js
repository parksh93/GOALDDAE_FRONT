import {Link} from 'react-router-dom'
import { Box, useMediaQuery, useTheme } from '@material-ui/core';

const Footer = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{bgcolor: "#3a3a3a", height : isSmallScreen? "120%" : "50vh", paddingBottom:"2%", color:"white"}}>
            <Box sx={{
                marginTop: "20%",
                display:"flex", 
                flexDirection: isSmallScreen ? "column" : "row", 
                justifyContent:"flex-start",
                width: isSmallScreen ? "100%" : "1400px"
                }}>
                <Box sx= {{
                    fontSize : isSmallScreen ? "12px" : "14px",
                    marginLeft : isSmallScreen ? "10%" : "5%",
                    marginTop: "2%"
                    }}>
                    매치
                    <Box sx={{fontSize : isSmallScreen ? "4px" : "13px", marginTop: isSmallScreen? "2%" : "13%", color:"#969696"}}>
                        <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>개인 매치</Box></Link>   
                        <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>팀 매치</Box></Link> 
                        <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>팀 가입하기</Box></Link> 
                        <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>자유게시판</Box></Link> 
                        <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>핫이슈</Box></Link> 
                    </Box>
                </Box>
                <Box sx= {{
                    fontSize : isSmallScreen ? "12px" : "14px", 
                    marginLeft : isSmallScreen ? "10%" : "3%",
                    marginTop : isSmallScreen ? "5%" : "2%",
                    }}>
                    서비스 지역
                        <Box sx={{fontSize : isSmallScreen ? "4px" : "13px", marginTop: isSmallScreen? "2%" : "13%", color:"#969696"}}>
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

                <Box sx= {{
                    fontSize : isSmallScreen ? "12px" : "14px", 
                    marginLeft : isSmallScreen ? "10%" : "5%",
                    marginTop : isSmallScreen ? "5%" : "2%" }}>
                    소셜 미디어
                    <Box sx={{fontSize : isSmallScreen ? "4px" : "13px", marginTop: isSmallScreen? "2%" : "13%", color:"#969696"}}>
                        <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>인스타그램</Box></Link> 
                        <Link to="/"><Box sx={{marginTop : isSmallScreen ? "1%" : "10%"}}>유튜브</Box></Link> 
                    </Box>
                </Box>

                <Box sx={{
                    fontSize : isSmallScreen ? "15px" : "40px",
                    marginLeft : isSmallScreen ? "10%" : "20%",
                    marginTop : isSmallScreen ? "5%" : "3%"}}>
                    <Box sx={{fontFamily:"Anton"}}>GOALDDAE</Box>
                    <Box sx={{fontSize:"13px", marginTop:"2%", color:"#969696"}}>
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
            </Box>
        </Box>
    );
}

export default Footer;
