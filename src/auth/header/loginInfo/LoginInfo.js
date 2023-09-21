import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginInfo.module.css";
import * as React from "react";
import { useUser } from "../../../userComponent/userContext/UserContext";

const LoginInfo = () => {
  const {userInfo, getUserInfo, logout} = useUser();

  useEffect(() => {
    getUserInfo();
  },[]);
  
  return (
    <div className={styles.container}>
      {userInfo === null ? (
        <div className={styles.btnContainer}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className={styles.button}>로그인</button>
          </Link>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <button className={styles.button}>회원가입</button>
          </Link>
        </div>
      ) : (
          <div className={styles.userInfoContainer}>
            <img src={userInfo.profileImgUrl} className={styles.profileImg} />
            <Link to="/myPage" className={styles.nickname}>{userInfo.nickname}</Link>
            <p className={styles.line}> | </p>
            <Link to="/userChat" className={styles.chatBtn}>채팅 </Link>
            <p className={styles.line}> | </p>
            <Link className={styles.logoutBtn} onClick={() => logout()}> 로그아웃</Link>
          </div>
        )}
      </div>
  );
};

export default LoginInfo;