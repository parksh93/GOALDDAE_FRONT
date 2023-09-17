import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MyPage.css';

function Setting({ userId, userInfo }) {
    const [userSettings, setUserSettings] = useState(null);    

  // 회원탈퇴
  const handleDeleteAccount = async (event) => {
    event.preventDefault();
  
    const confirmed = window.confirm("정말로 탈퇴하시겠습니까?");
    if (confirmed) {
      try {
        await axios.post('/user/logout');
        await axios.post(`/user/deleteAccount/${userId}`);
        window.location.href = '/'; 
        
      } catch (error) {
        console.error("회원 탈퇴 중 오류가 발생했습니다. :", error);
        console.log(userId);
      }
    }
  };

    return (
        <div className="user-card-setting">

        <div style={{ marginBottom: '20px' }}>
            <Link to={`/myPage/changePassword/${userId}`} className="button-link">
            <button
                className="button-1"
                style={{
                backgroundColor: 'white',
                color: 'grey',
                borderRadius: '50px', // 동그랗게 만들기
                padding: '10px 20px',
                border: 'none',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // 은은한 그림자
                cursor: 'pointer',
                transition: 'background-color 0.3s, transform 0.2s',
                textDecoration: 'none',
                }}
            >
                비밀번호 변경하기
            </button>
            </Link>
            </div>

            <button
            className="button-2"
            onClick={handleDeleteAccount}
            style={{
                backgroundColor: 'white',
                color: 'grey',
                borderRadius: '50px', // 동그랗게 만들기
                padding: '10px 20px',
                border: 'none',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // 은은한 그림자
                cursor: 'pointer',
                transition: 'background-color 0.3s, transform 0.2s',
            }}
            >
            회원 탈퇴하기
            </button>

            <div style={{ marginBottom: '60px' }}></div>
            <p><Link to="#" 
            style={{color: 'grey', fontSize: '14px'}}>
                  서비스 이용약관
            </Link></p>
            <p><Link to="#" 
            style={{color: 'grey', fontSize: '14px'}}>
                  개인정보 처리방침
            </Link></p>
            <p><Link to="#" 
            style={{color: 'grey', fontSize: '14px'}}>
                  골때 고객센터
            </Link></p>          

            <div style={{ marginTop: '40px' }}></div>
            <span style={{ color: 'grey', fontSize: '14px' }}> Copyrights © All Rights Reserved GOALDDAE </span>   
        </div>


    );
}

export default Setting;
