import React from 'react'
import {useEffect, useState, useContext} from 'react'
import styles from './Payment.module.css'
import {useNavigate} from 'react-router-dom';
import {useUser} from '../userComponent/userContext/UserContext';

const Payment = ({fieldName, reservationFree}) => {
    const navigete = useNavigate();
    const {userInfo} = useUser();
    const  [franchiseKey, setFranchiseKey] = useState('');
    const [pg, setPg] = useState('');

    useEffect(() => {
        fetch("/payment/getPaymentProperties")
        .then(res => res.json())
        .then(data => {
            setFranchiseKey(data.franchiseKey);
            setPg(data.pg);
        })
        
    },[]);

    let IMP = window.IMP; 
    IMP.init(franchiseKey); 

    var today = new Date();   
    var hours = today.getHours(); 
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var milliseconds = today.getMilliseconds();
    var makeMerchantUid = hours +  minutes + seconds + milliseconds;


    function requestPayKakao() {
        if(userInfo !== null){
            IMP.request_pay({
                pg : pg,
                pay_method : 'card',
                merchant_uid: "IMP"+makeMerchantUid,
                name : fieldName,
            amount : reservationFree,
            buyer_email : userInfo.email,
            buyer_name : userInfo.name,
            buyer_tel : userInfo.phoneNumber,   //필수 파라미터
            }, rsp => {
                console.log(rsp)
                if(rsp.success){
                    alert("결제 완료");
                }else{
                    alert("결제 실패");
                }
            });
        }else{
            alert("로그인이 후 이용 가능합니다.");
            navigete("/login");
        }
    }  
    return (
        <div className={styles.kakaopayBtnDiv}>
            <button onClick={requestPayKakao} className={styles.kakopayBtn}><img src='../img/kakaopay.Webp'/></button>
        </div>
    );
}

export default React.memo(Payment);