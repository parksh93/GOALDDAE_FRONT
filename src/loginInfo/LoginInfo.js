import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginInfo.module.css";
import buttonStyles from "./LoginInfo.module.css";  
import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const LoginInfo = () => {
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#FFFFFF",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  const [userInfo, setUserInfo] = useState("");

  const getUserInfo = async () => {
    const response = await fetch("/user/getUserInfo", { method: "POST" });
    if (response.status === 200) {
      const data = await response.json();
      setUserInfo(data);
    }
  };

  useEffect(() => {
    if (userInfo === "") {
      getUserInfo();
    }
  }, [userInfo]);

  return (
    <>
      {userInfo === "" ? (
        <div className={styles.btnContainer}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className={buttonStyles.button}>로그인</button>
          </Link>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <button className={buttonStyles.button}>회원가입</button>
          </Link>
        </div>
      ) : (
          <div>
            <img src={userInfo.profileImgUrl} className={styles.profileImg} />
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Link to="/myPage">내정보</Link>
                  <br />
                  <Link to="/logOut">로그아웃</Link>
                </React.Fragment>
              }
            >
              <p className={styles.userNickname}>{userInfo.nickname}</p>
            </HtmlTooltip>
          </div>
        )}
      </>
  );
};

export default LoginInfo;