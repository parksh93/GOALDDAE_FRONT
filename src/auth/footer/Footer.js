import {Link} from 'react-router-dom'
import { Box } from '@material-ui/core';

const Footer = () => {
    return (
        <Box sx={{bgcolor: "#3a3a3a", height: "50vh", color:"white", flexDirection:"row" }}>
            <Box sx={{marginTop:"20%", display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                    <Box sx= {{fontSize : "16px",marginLeft: "10%", marginTop:"2%"}} >
                        매치
                            <Box sx={{fontSize:"13px", marginTop:"13%", color:"#969696"}}>
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>개인 매치</Box>
                                </Link>   
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>팀 매치</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>팀 가입하기</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>자유게시판</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>핫이슈</Box>
                                </Link> 
                            </Box>
                    </Box>
                    <Box sx= {{fontSize:"16px", marginLeft:"5%", marginTop:"2%"}} >
                        서비스 지역
                        <Box sx={{fontSize:"13px", marginTop:"13%", color:"#969696"}}>
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>서울</Box>
                                </Link>   
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>경기</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>인천</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>강원</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>대전</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>충남/세종</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>충북</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>대구</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>경북</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>부산</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>울산</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>경남</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>광주</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>전남</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>전북</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>제주</Box>
                                </Link> 
                            </Box>
                    </Box>
                    <Box sx= {{fontSize:"16px", marginLeft:"5%", marginTop:"2%"}} >
                        골때
                        <Box sx={{fontSize:"13px", marginTop:"13%", color:"#969696"}}>
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>골때 소개</Box>
                                </Link>   
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>공지사항</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>자주 묻는 질문</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>매거진</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>매니저 지원</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>구장 제휴</Box>
                                </Link> 
                                <Link to="/">
                                    <Box sx={{marginTop:"10%"}}>채용</Box>
                                </Link> 
                            </Box>
                    </Box>

                    <Box sx= {{fontSize:"16px", marginLeft:"5%", marginTop:"2%"}} >
                        소셜 미디어
                        <Box sx={{fontSize:"13px", marginTop:"13%", color:"#969696"}}>
                            <Link to="/">
                                <Box sx={{marginTop:"10%"}}>인스타그램</Box>
                            </Link> 
                            <Link to="/">
                                <Box sx={{marginTop:"10%"}}>유튜브</Box>
                            </Link> 
                        </Box>
                    </Box>
                    <Box sx={{fontSize:"40px", marginLeft:"20%", marginTop:"3%"}}>
                        <Box sx={{fontFamily:"Anton"}}>
                            GOALDDAE
                        </Box>
                        <Box sx={{fontSize:"13px", marginTop:"2%", color:"#969696"}}>
                            <Box sx={{fontSize:"16px"}}>풋살 & 축구, 골때에서 즐기세요.</Box>
                            <Box sx={{marginTop:"5%"}}>
                                <Link to="/" sx={{fontSize:"16px", }}>이용 약관 | </Link>
                                <Link to="/" sx={{fontSize:"16px"}}>개인정보 처리방침 | </Link>
                                <Link to="/" sx={{fontSize:"16px"}}>사업자 정보 확인</Link>
                                <Box sx={{marginTop:"7%"}}>골때 | 서울특별시 강남구 역삼동 어딘가</Box>
                                <Box sx={{marginTop:"1%"}}>EMAIL: goalddae0718@gamil.com | HELP: 02)000-0000-0000</Box>
                                <Box sx={{marginTop:"1%"}}>주식회사 골때컴퍼니 | 사업자번호 000-00-00000</Box>
                                <Box sx={{marginTop:"1%"}}>대표 : 박 신 유 재 김</Box>
                                <Box sx={{marginTop:"10%"}}>
                                    Copyright   GOALDDAE    All rights reserved.
                                </Box>
                            </Box>

                        </Box>
                    </Box>   
            </Box>
        </Box>
    );
}

export default Footer;
