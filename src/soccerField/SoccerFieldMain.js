import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Payment from "../payment/Payment";
import styles from "./SoccerField.module.css";
import SoccerFieldImageSlide from "./SoccerFieldImageSlide";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShowerIcon from '@mui/icons-material/Shower';
import WcIcon from '@mui/icons-material/Wc';

const SoccerFieldMain = () => {
  let { fieldId } = useParams();
  const [fieldInfo, setFieldInfo] = useState({});

  useEffect(() => {
    fetch(`/field/getFieldInfo/${fieldId}`, { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        setFieldInfo(data)
        console.log(data)
      });
  }, [fieldId]);

  const on = { color : "#444444", marginBottom : "-3px"};

  const off = { color : "#aaaaaa", marginBottom : "-3px"};

  return (
    <div className={styles.container}>
      <SoccerFieldImageSlide />
      {fieldInfo && 
          <div className={styles.flexContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <h4>{fieldInfo.region}</h4>
                <h3>{fieldInfo.fieldName}</h3>
                <span>{fieldInfo.fieldSize} / </span>                
                <span>{fieldInfo.grassWhether === "1" ? "천연잔디 / " : "인조잔디 / "}</span>                
                <span>{fieldInfo.inOutWhether === "1" ? "실내" : "실외"}</span>                                                      
              </div>
              <div className={styles.info}>
                <h3>시설 이용 정보</h3>
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
              </div>                            
            </div>
            <div className={styles.reservationContainer}>
              <h3>예약하기</h3>
              <Payment
                fieldId={fieldInfo.id}
                fieldName={fieldInfo.fieldName}
                reservationFee={fieldInfo.reservationFee}
              />
              <div className={styles.reservationFee}>
                <div className={styles.reservationFeeFont}>대관비</div>
                <span>{fieldInfo.reservationFee}원</span>
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default React.memo(SoccerFieldMain);
