import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
<<<<<<< HEAD
import Payment from "../payment/Payment";
=======
import Payment from "../paument/Payment";
>>>>>>> d9c6addfee5f1a2cefad91dd019f1d30449d61a9
import styles from "./SoccerField.module.css";

const SoccerFieldMain = () => {
  let { fieldId } = useParams();
  const [fieldName, setFieldName] = useState("");
  const [reservationFree, setReservationFree] = useState(0);

  useEffect(() => {
    fetch(`/field/getFieldInfo/${fieldId}`, { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        setFieldName(data.fieldName);
        setReservationFree(data.reservationFree);
      });
  }, []);

  return (
    <div>
      <div className={styles.reservationFree}>
        <div className={styles.reservationFreeFont}>대관비</div>
        <span>{reservationFree}원</span>
      </div>
      <Payment
        fieldId={fieldId}
        fieldName={fieldName}
        reservationFree={reservationFree}
      />
    </div>
  );
};

export default React.memo(SoccerFieldMain);
