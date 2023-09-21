import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SoccerField.module.css";
import SoccerFieldImageSlide from "./SoccerFieldImageSlide";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShowerIcon from '@mui/icons-material/Shower';
import WcIcon from '@mui/icons-material/Wc';
import SoccerFieldTimeLine from "./SoccerFieldTimeLine";
import MapComponent from "./MapComponent";

const SoccerFieldMain = () => {
  let { fieldId } = useParams();
  const [fieldInfo, setFieldInfo] = useState({});

  useEffect(() => {
    fetch(`/field/getFieldInfo/${fieldId}`, { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        setFieldInfo(data)
      });
  }, [fieldId]);

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
    <div>      
      <div className={styles.container}>                
      {fieldInfo && 
      <SoccerFieldImageSlide fieldInfo={fieldInfo} />}
        {fieldInfo && 
            <div className={styles.flexContainer}>
              <div className={styles.infoContainer}>
                <div className={styles.info}>
                  <div className={styles.infoText}>{fieldInfo.province} / {fieldInfo.region}</div>
                  <div className={styles.infoTitle}>{fieldInfo.fieldName}</div>
                  <div className={styles.infoText}>
                    <span>{fieldInfo.fieldSize} / </span>                
                    <span>{fieldInfo.grassWhether === "1" ? "천연잔디 / " : "인조잔디 / "}</span>                
                    <span>{fieldInfo.inOutWhether === "1" ? "실내" : "실외"}</span>     
                  </div>                                                 
                </div>
                <div className={styles.info}>
                  <h3>시설 이용 정보</h3>
                  <div>
                   <span className={styles.on}> 영업시간 : {timeFormat(fieldInfo.operatingHours)} ~ {timeFormat(fieldInfo.closingTime)}</span>
                  </div>
                  <br/>
                  <div>
                    {fieldInfo.parkingStatus ?
                  <>
                  <DirectionsCarIcon sx={on}/> <span className={styles.on}>주차장 - 사용가능</span>
                  </> : 
                  <>
                  <DirectionsCarIcon sx={off}/> <span className={styles.off}>주차장</span>
                  </>
                  }
                  </div>
                  <div>
                    {fieldInfo.showerStatus ?
                  <>
                  <ShowerIcon sx={on}/> <span className={styles.on}>샤워실 - 사용가능</span>
                  </> : 
                  <>
                  <ShowerIcon sx={off}/> <span className={styles.off}>샤워실</span>
                  </>
                  }
                  </div>
                  <div>
                    {fieldInfo.toiletStatus ?
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
                  <div>{fieldInfo.content && fieldInfo.content}</div>                  
                </div>
                <div className={styles.info}>
                  <h3>위치 정보</h3>
                  {fieldInfo.address &&
                  <>
                    <MapComponent fieldInfo={fieldInfo} />
                    <br></br>
                    <br></br>
                    <div className={styles.infoText}>
                      {fieldInfo.address}
                      <span onClick={() => {handleCopyClipBoard(fieldInfo.address)}} style={{color : "#777777", textDecoration : "underline", marginLeft : "10px"}}>
                        주소 복사
                      </span>
                    </div>
                  </> 
                  }
                </div>                            
              </div>
              <div className={styles.reservationContainer}>
                <div className={styles.infoTitle}>예약하기</div>
                {fieldInfo && 
                <SoccerFieldTimeLine fieldInfo={fieldInfo} />
                }
              </div>
            </div>
        }
      </div>
    </div>
  );
};

export default React.memo(SoccerFieldMain);
