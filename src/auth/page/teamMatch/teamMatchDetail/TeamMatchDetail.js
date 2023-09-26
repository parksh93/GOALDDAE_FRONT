import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShowerIcon from '@mui/icons-material/Shower';
import WcIcon from '@mui/icons-material/Wc';
import MapComponent from "./MapComponent";
import axios from "axios";
import { useUser } from "../../../../userComponent/userContext/UserContext";
import ImageSlide from "./ImageSlide";
import styles from "./TeamMatchDetail.module.css";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button } from "react-bootstrap";
import { BiCalendarCheck } from "react-icons/bi";
const TeamMatchDetail = () => {
  const { teamMatchId } = useParams(); 
  const [ teamMatchInfo, setTeamMatchInfo ] = useState(null);
  const { userInfo } = useUser();
  const [ isTeamLeader, setIsTeamLeader ] = useState(false); 
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openSnackbar = (message) => {
    setMessage(message);
    setOpen(true);
  };
  
  const closeSnackbar = () => {
    setOpen(false);
  };
  
  // 신청하기
  const handleRequestJoin = async () => {
    if (!userInfo) { 
      openSnackbar('로그인 후 사용 가능합니다.');
      return;
    }
  
    if (!userInfo.teamId) {
      openSnackbar('팀이 없습니다.');
      return;
    }

    if (teamMatchInfo.hasApplied) {
      openSnackbar('이미 신청한 매치입니다.');
      return;
    }

    try{
      await axios.put(`/team/match/request/${teamMatchId}`, { 
        awayUserId: userInfo.id,
        awayTeamId: userInfo.teamId 
      });
      
      openSnackbar('팀매치 신청이 완료되었습니다.');
      
      setTeamMatchInfo(prevState => ({...prevState, hasApplied: true}));
        
    } catch(error){
      console.error(error);

      if (error.response && error.response.data === 'The user has already applied for this match.') {
        openSnackbar('이미 신청한 매치입니다.');
      } else {
        openSnackbar('이미 신청한 매치입니다.');
      }
    }
  }

  const handleCancelRequest = async () => {
    try {
        await axios.delete(`/team/match/cancel/${teamMatchId}`, {
            data: { userId: userInfo.id, teamId: userInfo.teamId }
        });

        openSnackbar('팀매치 신청이 취소되었습니다.');

        setTeamMatchInfo(prevState => ({ ...prevState, hasApplied: false }));
    } catch (error) {
        console.error(error);

        // 에러 메시지에 따른 처리가 필요하다면 여기에서도 추가할 수 있습니다.
        openSnackbar('신청 취소에 실패하였습니다.');
    }
  };

  useEffect(() => {
    setIsTeamLeader(userInfo?.isLeader ?? false);
  }, [userInfo]);


  useEffect(() => {
    const requestTeamMatch = async () => {
      try {
        const response = await axios.get(`/team/match/detail/${teamMatchId}`);
        setTeamMatchInfo(response.data); 
      } catch (error) {
        console.error(error); 
      }
    };

    requestTeamMatch();
    
  }, [teamMatchId, userInfo]);
  

  const on = { color : "#444444", marginBottom : "-3px"};

  const off = { color : "#aaaaaa", marginBottom : "-3px"};

  const timeFormat = (time) => {
    if(time){
      return time.substring(0, 5); 
    }
  }

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };


return (
  <div style={{backgroundColor:"#F5F5F5"}}>      
    <div className={styles.container}>                
    {teamMatchInfo && 
      <ImageSlide fieldInfo={teamMatchInfo} />
    }
      {teamMatchInfo && 
          <div className={styles.flexContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <div className={styles.infoText}>{teamMatchInfo.province} / {teamMatchInfo.region}</div>
                <div className={styles.infoTitle}>{teamMatchInfo.fieldName}</div>
                <div className={styles.infoText}>
                  <span>{teamMatchInfo.fieldSize} / </span>                
                  <span>{teamMatchInfo.grassWhether === "1" ? "천연잔디 / " : "인조잔디 / "}</span>                
                  <span>{teamMatchInfo.inOutWhether === "1" ? "실내" : "실외"}</span>     
                </div>                                                 
              </div>
              <div className={styles.info}>
                <h3>경기 정보</h3>
                <div>
                    <BiCalendarCheck  className={styles.matchInfoIcon}/>{" "}
                    <span style={on}>날짜 : {new Date(teamMatchInfo.startTime).toLocaleDateString()} {new Date(teamMatchInfo.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <hr className={styles.separator}/>
                <h3>시설 이용 정보</h3>
                <div>
                  <span className={styles.on}> 영업시간 : {timeFormat(teamMatchInfo.operatingHours)} ~ {timeFormat(teamMatchInfo.closingTime)}</span>
                </div>
                <br/>
                <div>
                  {teamMatchInfo.parkingStatus ?
                <>
                <DirectionsCarIcon sx={on}/> <span className={styles.on}>주차장 - 사용가능</span>
                </> : 
                <>
                <DirectionsCarIcon sx={off}/> <span className={styles.off}>주차장</span>
                </>
                }
                </div>
                <div>
                  {teamMatchInfo.showerStatus ?
                <>
                <ShowerIcon sx={on}/> <span className={styles.on}>샤워실 - 사용가능</span>
                </> : 
                <>
                <ShowerIcon sx={off}/> <span className={styles.off}>샤워실</span>
                </>
                }

                </div>
                <div>
                  {teamMatchInfo.toiletStatus ?
                <>
                <WcIcon sx={on}/> <span className={styles.on}>화장실 - 사용가능</span>
                </> : 
                <>
                <WcIcon sx={off}/> <span className={styles.off}>화장실</span>
                </>
                }
                </div>
                <hr className={styles.separator}/>
                <h3>시설 특이사항</h3>
                <div>{teamMatchInfo.content && teamMatchInfo.content}</div>                  
              </div>
              <div className={styles.info}>
                <h3>위치 정보</h3>
                {teamMatchInfo.address &&
                <>
                  <MapComponent fieldInfo={teamMatchInfo} />
                  <br></br>
                  <br></br>
                  <div className={styles.infoText}>
                    {teamMatchInfo.address}
                    <span onClick={() => {handleCopyClipBoard(teamMatchInfo.address)}} style={{color : "#777777", textDecoration : "underline", marginLeft : "10px"}}>
                      주소 복사
                    </span>
                  </div>
                </> 
                }
              </div>                            
            </div>
            <div className={styles.reservationContainer}>
            <div className={styles.infoTitle}>신청 현황</div>
            {teamMatchInfo && (
              <div style={{ marginTop:'30px', fontSize: '13px', display: 'flex', justifyContent: 'center'}}>
                <div style={{marginRight: '50px'}}>
                  <div style={{fontSize:'16px', fontWeight:'bold'}}>홈팀: {teamMatchInfo.homeTeamName}</div>
                  <img src={teamMatchInfo.homeTeamProfileImg} alt="홈 팀 프로필 이미지" />
                </div>

                {teamMatchInfo.awayTeamName && (
                  <div>
                    <div style={{fontSize:'16px', fontWeight:'bold'}}>원정팀: {teamMatchInfo.awayTeamName}</div>
                    <img src={teamMatchInfo.awayTeamProfileImg} alt="원정 팀 프로필 이미지" />
                  </div>
                )}
              </div>
            )}
            {teamMatchInfo && (
              <div style={{ display: 'flex', justifyContent:'center', gap: '10px', marginTop:'68%'}}>
                {teamMatchInfo.hasApplied ? (
                  <>
                    <Button disabled>신청하기</Button>
                    <Button variant="danger" onClick={handleCancelRequest}>취소하기</Button>
                  </>
                ) : (
                  <Button onClick={handleRequestJoin}>신청하기</Button>
                )}
              </div>
            )}
            </div>
          </div>
      }
    </div>
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity="info" sx={{ width: '400%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>  
  );
};

export default TeamMatchDetail;
