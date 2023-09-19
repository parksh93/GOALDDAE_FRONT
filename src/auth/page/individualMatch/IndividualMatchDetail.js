import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./IndividualMatchDetail.module.css";
import IndividualMatchDetailSlide from "./IndividualMatchDetailSlide";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ShowerIcon from "@mui/icons-material/Shower";
import WcIcon from "@mui/icons-material/Wc";
import MapComponent from "../../../soccerField/MapComponent";
import { AiTwotoneStar } from "react-icons/ai";
import {
  BsGenderAmbiguous,
  BsFillPeopleFill,
  BsAlarm,
  BsGlobeAmericas,
} from "react-icons/bs";
import {
  BiCalendarCheck
} from "react-icons/bi";
import {useUser} from "../../../userComponent/userContext/UserContext"
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IndividualMatchCancelModal from "./IndividualMatchCancelModal";
import axios from "axios";

const IndividualMatchDetail = () => {
  const { matchId } = useParams();
  const [matchInfo, setMatchInfo] = useState(null);
  const {userInfo} = useUser();
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success")
  const navigate = useNavigate();
  const [matchPlayerList, setMatchPlayerList] = useState([]);
  const [playerInMe, setPlayInMe] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`/match/individual/detail/${matchId}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data !== null) {
          console.log(data)
          setMatchInfo(data);
        }
      });
  }, []);

  useEffect(() => {
    fetch(`/match//individual/getPlayer/${matchId}`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
      setMatchPlayerList(data)
    });
  },[]);
  
  useEffect(() => {
    if(userInfo !== null){
      for (let i = 0; i < matchPlayerList.length; i++) {
        if(matchPlayerList[i].id === userInfo.id){
          setPlayInMe(true);
          break;
        }
      }
    }
  },[matchPlayerList, userInfo]);

  const on = { color: "#444444", marginBottom: "-3px" };

  const off = { color: "#aaaaaa", marginBottom: "-3px" };

  const timeFormat = (time) => {
    if (time) {
      return time.substring(0, 5);
    }
  };

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setOpen(true);
      setAlertText("클립보드에 주소가 복사되었습니다.");
      setAlertSeverity("info");
      setTimeout(() => {
        setOpen(false);
      },1000)
    } catch (e) {
      setOpen(true);
      setAlertText("복사에 실패했습니다.");
      setAlertSeverity("error");
      setTimeout(() => {
        setOpen(false);
      },1000)
    }
  };

  const onClickMatchRequest = () => {
    if(userInfo === null){
      setOpen(true);
      setAlertText("로그인 후 신청 가능합니다.");
      setAlertSeverity("error");
      setTimeout(() => {
        setOpen(false);
        navigate("/login");
      },1000)
    }else{
      axios.put("/match/individual/request", {
      //   method: "PUT",
      // headers: {"Content-Type": "application/json"},
      // body: JSON.stringify({
        matchId: matchId,
        userId: userInfo.id
      // })
      }).then(() => {
        setOpen(true);
        setAlertText("해당 경기에 참가신청이 완료되었습니다.");
        setAlertSeverity("success");
        setTimeout(() => {
          setOpen(false);
          window.location.reload();
        },1000)
      })
      .catch(() => {
        setOpen(true);
        setAlertText("해당 경기에 정원이 다 찼습니다.");
        setAlertSeverity("error");
        setTimeout(() => {
          setOpen(false);
          window.location.reload();
        },1000)
      });
    }
  }
  
  const overMatchInBtn = () => {
    if(matchInfo.userId === userInfo.id){
      document.getElementById("matchInBtn").innerText = "취소불가"; 
    }else{
      document.getElementById("matchInBtn").innerText = "취소";
      document.getElementById("matchInBtn").style.background = "#DF5353";
    }
  }
  
  const outMatchInBtn = () => {
    document.getElementById("matchInBtn").innerText = "참가중"
    document.getElementById("matchInBtn").style.background = "lightgray";
  }
 
  const onClickMatchCancel = () => {
    if(matchInfo.userId === userInfo.id){
      setOpen(true);
      setAlertText("매치 생성자는 해당 경기를 취소할 수 없습니다.");
      setAlertSeverity("error");
      setTimeout(() => {
        setOpen(false);
      },1000)
    }else {
      setModalOpen(true);
    }
  }

  const cancelMatchRequestFecth = () => {
    const now = new Date();
    const matchStartDate = new Date(matchInfo.startDate);

    if(now.getDate() !== matchStartDate.getDate()){
      fetch("/match/individual/cancelRequest", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          matchId: matchInfo.id,
          userId: userInfo.id
        })
      }).then(() => {
        setModalOpen(false);
        setOpen(true);
        setAlertText("매치 참가가 취소되었습니다.");
        setAlertSeverity("success");
        setTimeout(() => {
          setOpen(false);
          window.location.reload();
        },1000);
      })
    }else {
      setModalOpen(false);
      setOpen(true);
      setAlertText("당일 매치 취소는 불가합니다.");
      setAlertSeverity("error");
      setTimeout(() => {
        setOpen(false);
      },1000);

    }
  }

  return (
    <div>
        <Collapse in={open}>
          <Alert severity={alertSeverity} sx={{width: "30%", position: "fixed",marginLeft: "35%", zIndex: "999", borderRadius: "30px", top: "0", marginTop: "20px"}}>
            {alertText}
          </Alert>
      </Collapse>
      <IndividualMatchCancelModal modalOpen={modalOpen} setModalOpen={setModalOpen} cancelMatchRequestFecth={cancelMatchRequestFecth}/>
      {matchInfo !== null ? (
        <div className={styles.container}>
          <IndividualMatchDetailSlide matchInfo={matchInfo} />
          <div className={styles.flexContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <div className={styles.infoText}>
                  {matchInfo.province} / {matchInfo.region}
                </div>
                <div className={styles.infoTitle}>{matchInfo.fieldName}</div>
                <div className={styles.infoText}>
                  <span>{matchInfo.fieldSize} / </span>
                  <span>
                    {matchInfo.grassWhether ? "천연잔디 / " : "인조잔디 / "}
                  </span>
                  <span>{matchInfo.inOutWhether ? "실내" : "실외"}</span>
                </div>
              </div>
              <div className={styles.info}>
                <h3>경기 정보</h3>
                <div className={styles.matchInfoDiv}>
                  <div>
                    <BiCalendarCheck  className={styles.matchInfoIcon}/>{" "}
                    <span>날짜 : {matchInfo.playDate}</span>
                  </div>
                  <div>
                    <BsAlarm className={styles.matchInfoIcon} />{" "}
                    <span>
                     시간 : {timeFormat(matchInfo.startTime)} ~{" "}
                      {timeFormat(matchInfo.endTime)}
                    </span>
                  </div>
                  <div>
                    <BsGenderAmbiguous className={styles.matchInfoIcon} />{" "}
                    <span>성별 : {matchInfo.gender} </span>
                  </div>
                  <div>
                    <BsFillPeopleFill className={styles.matchInfoIcon} />{" "}
                    <span>참가 인원 : {matchInfo.playerNumber}명</span>
                  </div>
                  <div>
                    <BsGlobeAmericas className={styles.matchInfoIcon} />{" "}
                    <span>제한 레벨 : {matchInfo.limitLevel}</span>
                  </div>
                </div>
                <div>
                  <hr className={styles.separator} />
                  <h3>구장 정보</h3>
                  {matchInfo.parkingStatus ? (
                    <>
                      <DirectionsCarIcon sx={on} />{" "}
                      <span className={styles.on}>주차장 - 사용가능</span>
                    </>
                  ) : (
                    <>
                      <DirectionsCarIcon sx={off} />{" "}
                      <span className={styles.off}>주차장</span>
                    </>
                  )}
                </div>
                <div>
                  {matchInfo.showerStatus ? (
                    <>
                      <ShowerIcon sx={on} />{" "}
                      <span className={styles.on}>샤워실 - 사용가능</span>
                    </>
                  ) : (
                    <>
                      <ShowerIcon sx={off} />{" "}
                      <span className={styles.off}>샤워실</span>
                    </>
                  )}
                </div>
                <div>
                  {matchInfo.toiletStatus ? (
                    <>
                      <WcIcon sx={on} />{" "}
                      <span className={styles.on}>화장실 - 사용가능</span>
                    </>
                  ) : (
                    <>
                      <WcIcon sx={off} />{" "}
                      <span className={styles.off}>화장실</span>
                    </>
                  )}
                </div>
                <h4>특이사항</h4>
                <div>{matchInfo.content}</div>
              </div>
              <div className={styles.info}>
                <h3>위치 정보</h3>
                <MapComponent fieldInfo={matchInfo} />
                <br></br>
                <br></br>
                <div className={styles.infoText}>
                  {matchInfo.address}
                  <span
                    onClick={() => {
                      handleCopyClipBoard(matchInfo.address);
                    }}
                    style={{
                      color: "#777777",
                      textDecoration: "underline",
                      marginLeft: "10px",
                    }}
                  >
                    주소 복사
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.playerContainer}>
              <div className={styles.infoTitle}>참가인원</div>
              <div className={styles.playerInfoDiv}> 
                <div className={styles.roomManagerInfo}>
                  <div className={styles.profileImgDiv}>
                    <img
                      src={matchInfo.profileImgUrl}
                      className={styles.userProfile}
                    />
                  </div>
                  <div className={styles.userInfoDiv}>
                    <span className={styles.nickname}>{matchInfo.nickname}</span>
                    <br />
                    <span className={styles.level}>{matchInfo.level}</span>
                  </div>
                  <AiTwotoneStar className={styles.roomManagerStar} />
                </div>
                <div>
                   {matchPlayerList.length !== 0 ? 
                    matchPlayerList.map(player => (
                      <div>
                        <div className={styles.profileImgDiv}>
                          <img src={player.profileImgUrl}  className={styles.userProfile}/>
                        </div>
                        <div className={styles.userInfoDiv}>
                          <span className={styles.nickname}>{player.nickname}</span><br />
                          <span className={styles.level}>{player.level}</span>
                        </div>
                      </div>
                    ))    
                   :""
                   }
                </div>
              </div>
              {
                userInfo === null && matchInfo.status !== "마감"? 
                <button className={styles.matchRequestBtn} onClick={onClickMatchRequest}>참가 신청</button>
                :
                matchInfo.userId === userInfo.id || playerInMe? 
                <button className={styles.matchInBtn} id="matchInBtn" onMouseOver={overMatchInBtn} onMouseOut={outMatchInBtn} onClick={onClickMatchCancel}>참가중</button>
                :
                matchInfo.status === "마감" ? 
                <button className={styles.matchEndBtn}>마감</button>
                :
                <button className={styles.matchRequestBtn} onClick={onClickMatchRequest}>참가 신청</button>
              }
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default IndividualMatchDetail;
