import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Payment from "../payment/Payment";
import styles from "./SoccerField.module.css";
import SoccerFieldImageSlide from "./SoccerFieldImageSlide";

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

  return (
    <div className={styles.container}>
      <SoccerFieldImageSlide />
      {fieldInfo && 
          <div className={styles.flexContainer}>
            <div className={styles.infoContainer}>
              <h2>경기장 정보</h2>
              <h2>구장명 : {fieldInfo.fieldName}</h2>
              <h2>지역 : {fieldInfo.region}</h2>
              <h2>잔디 : {fieldInfo.grassWhether === "1" ? "자연잔디" : "인조잔디"}</h2>
              <h2>실내여부 : {fieldInfo.inOutWhether === "1" ? "실내" : "실외"}</h2>
              <h2>주차장 : {fieldInfo.parkingStatus ? "있음" : "없음"}</h2>
              <h2>샤워실 : {fieldInfo.showerStatus ? "있음" : "없음"}</h2>
              <h2>화장실 : {fieldInfo.toiletStatus ? "있음" : "없음"}</h2>
            </div>
            <div className={styles.reservationContainer}>
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
