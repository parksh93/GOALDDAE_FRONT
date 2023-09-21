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
import Alert from '@mui/material/Alert';

const TeamMatchDetail = () => {
  const { teamMatchId } = useParams(); 
  const [ teamMatchInfo, setTeamMatchInfo ] = useState(null);
  const { userInfo } = useUser();
  const [ isTeamLeader, setIsTeamLeader ] = useState(false); // 팀장 여부 상태 추가
  const [ showAlert, setShowAlert ] = useState(false); // 알림 상태 추가
  const [ homeTeamStatus, setHomeTeamStatus ] = useState(null);
  const [ awayTeamStatus, setAwayTeamStatus ] = useState(null);
  const [ selectedTeam, setSelectedTeam ] = useState('home'); // 'home' 또는 'away'

  useEffect(() => {
    const requestTeamMatch = async () => {
      try {
        const response = await axios.get(`/team/match/detail/${teamMatchId}`);
        setTeamMatchInfo(response.data); 
      } catch (error) {
        console.error(error); 
      }
    };
  
    const checkIfTeamLeader = async () => {
      if (userInfo) { // 로그인한 사용자만 팀장 여부 확인
        try {
          const response = await axios.get(`/team/checkIfTeamLeader/${userInfo.id}`);
          setIsTeamLeader(response.data);
        } catch (error) {
          console.error(error);
        }
      }   
    }
  
    const fetchApplicationStatus = async () => {
      try{
        const responseHome = await axios.get(`/team/match/detail/${teamMatchId}/home`);
        setHomeTeamStatus(responseHome.data);
        
        const responseAway = await axios.get(`/team/match/detail/${teamMatchId}/away`);
        setAwayTeamStatus(responseAway.data);
        
      }catch(error){
        console.error(error);
      }
    }
  
    requestTeamMatch();
    checkIfTeamLeader();
    
    if (userInfo) { // 로그인한 사용자만 신청 현황 확인
      fetchApplicationStatus();
    }
  }, [teamMatchId, userInfo]);
  
  // 신청하기
  const handleRequestJoin = async () => {
    if (userInfo) {
      if (!isTeamLeader) { // 팀원 또는 비회원일 경우
        setShowAlert(true);
        return;
      }

      try{
        await axios.post(`/team/match/request/${teamMatchId}`, { userId: userInfo.id });
        alert('팀매치에 신청이 완료되었습니다.');
      }catch(error){
        console.error(error);
      }
    } else{
      alert('로그인 후 사용 가능합니다.');
    }
  }


  const handleSelectHomeTeam = () => {
    setSelectedTeam('home');
  };
  
  const handleSelectAwayTeam = () => {
    setSelectedTeam('away');
  };

 const on = { color : "#444444", marginBottom : "-3px"};

 const off = { color : "#aaaaaa", marginBottom : "-3px"};

 const timeFormat = (time) => {
   if(time){
     return time.substring(11, 16);
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
      {showAlert && 
        <Alert severity="warning" onClose={() => setShowAlert(false)}>
          최초 신청은 팀장만 가능합니다!
        </Alert>
      }
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
                  <h3>시설 이용 정보</h3>
                  <div>
                  <span className={styles.on}> 영업시간 : {timeFormat(teamMatchInfo.startTime)} ~ {timeFormat(teamMatchInfo.endTime)}</span>
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
              
              <div>
                <span 
                  onClick={handleSelectHomeTeam} 
                  style={{ color: selectedTeam === 'home' ? 'blue' : 'black', cursor: 'pointer' }}
                >
                  Home 팀원
                </span>
                
                <span> / </span>

                <span 
                  onClick={handleSelectAwayTeam} 
                  style={{ color: selectedTeam === 'away' ? 'blue' : 'black', cursor: 'pointer' }}
                >
                  Away 팀원
                </span>
              </div>

              {selectedTeam === 'home' && homeTeamStatus && 
                <>
                  <h4>홈팀 신청 현황</h4>
                  {homeTeamStatus.map((status, index) =>
                    <p key={index}>{status.userName} ({status.userId})</p>
                  )}
                </>
              }
              
              {selectedTeam === 'away' && awayTeamStatus && 
                <>
                  <h4>어웨이팀 신청 현황</h4>
                  {awayTeamStatus.map((status, index) =>
                    <p key={index}>{status.userName} ({status.userId})</p>
                  )}
                </>
              }
              {teamMatchInfo &&
                <>
                  <button onClick={handleRequestJoin}>신청하기</button>
                </>
                }
              </div>
            </div>
        }
      </div>
    </div>
  );
};

export default TeamMatchDetail;
