import React from "react";
import { useEffect, useState, useContext } from "react";
import styles from "./Payment.module.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userComponent/userContext/UserContext";

const Payment = ({ fieldId, fieldName, reservationFee }) => {
  const navigete = useNavigate();
  const { userInfo } = useUser();
  const [franchiseKey, setFranchiseKey] = useState("");

  useEffect(() => {
    fetch("/payment/getPaymentProperties")
      .then((res) => res.json())
      .then((data) => {
        setFranchiseKey(data.franchiseKey);
      });
  }, []);

  let IMP = window.IMP;
  IMP.init(franchiseKey);

  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  var milliseconds = today.getMilliseconds();
  var makeMerchantUid = hours + minutes + seconds + milliseconds;

  function requestPayKakao() {
    if (userInfo !== null) {
      IMP.request_pay(
        {
          pg: "kakaopay.TC0ONETIME",
          pay_method: "card",
          merchant_uid: "GOALDDAEIMP" + makeMerchantUid,
          name: fieldName,
          amount: reservationFee,
          buyer_email: userInfo.email,
          buyer_name: userInfo.name,
          buyer_tel: userInfo.phoneNumber,
        },
        (rsp) => {
          if (rsp.success) {
            fetch("/payment/verifyIamPort", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                impUid: rsp.imp_uid,
                amount: rsp.paid_amount,
                fieldId: fieldId,
              }),
            })
              .then((res) => {
                if (res.status !== 200) {
                  throw new Error();
                }

                alert("결제 성공");
              })
              .catch(() => {
                fetch("/payment/cancelPayment", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    impUid: rsp.imp_uid,
                    reason: "결제 금액 위/변조",
                    checkSum: rsp.paid_amount,
                    refundHolder: rsp.buyer_name,
                  }),
                });
                alert("결제 실패: 결제 금액 다름");
              });
          }
        }
      );
    } else {
      alert("로그인이 후 이용 가능합니다.");
      navigete("/login");
    }
  }
  return (
    <div>
      <div onClick={requestPayKakao} className={styles.reservationFee}>
        대관비 {reservationFee}원 결제 및 예약하기
      </div>
    </div>
  );
};

export default React.memo(Payment);
