import { useCallback, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import LoginIdInput from "./LoginIdInput";
import PasswordInput from "./PasswordInput";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import SocialLogin from "./SocialLogin";
import { useUser } from "../userContext/UserContext";

const UserLogin = () => {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheckMsg, setLoginCheckMsg] = useState("");
  const [open, setOpen] = useState(false);
  const {getUserInfo} = useUser();

  const onKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      submitLogin();
    }
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },[])

  const getLoginCheck = async () => {
    await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginId: loginId,
        password: password,
      }),
    }).then(res => res.json())
    .then(data => {
      if (data === true) {
        getUserInfo();
        navigate(-1);
      }
    }).catch(() => {     
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
    });
  };

  const submitLogin = useCallback(() => {
    if (loginId === "") {
      setLoginCheckMsg("아이디를 입력해주세요.");
      return;
    }

    if (password === "") {
      setLoginCheckMsg("비밀번호를 입력해주세요.");
      return;
    }
    getLoginCheck();
  });

  return (
    <div>
      <Collapse in={open}>
        <Alert severity={"error"}>
          <AlertTitle>
            <b>{"로그인 실패"}</b>
          </AlertTitle>
          존재하지 않는 아이디이거나, 아이디와 비밀번호가 일치하지 않습니다.
          <br />
          다시 확인해주세요.
        </Alert>
      </Collapse>
      <section className={styles.logoSection}>
        <a href="/">
          <img src="./img/goalddaeLogo.png" className={styles.logo} />
        </a>
      </section>
      <section className={styles.loginSection}>
        <LoginIdInput
          label="아이디"
          value={loginId}
          setValue={setLoginId}
          inputStyle={styles.input}
          onKeyDown={onKeyPress}
          type="text"
        />
      </section>
      <section className={styles.loginSection}>
        <PasswordInput
          label="비밀번호"
          value={password}
          setValue={setPassword}
          inputStyle={styles.input}
          onKeyDown={onKeyPress}
          type="password"
        />
      </section>
      <p className={styles.msg}>{loginCheckMsg}</p>
      <section className={styles.loginBtnSection}>
        <CheckBnt className={styles.loginBtn} onClick={submitLogin}>
          로그인
        </CheckBnt>
      </section>
      <section className={styles.socialLoginSection}>
        <hr/>
        <SocialLogin />
      </section>
      <section className={styles.etcBtnSection}>
        <Link to="/find/1" className={styles.etcBtn}>아이디 찾기</Link><span className={styles.screen}>|</span> &nbsp; 
        <Link to="/find/2" className={styles.etcBtn}>비밀번호 찾기</Link><span className={styles.screen}>|</span> &nbsp; 
        <Link to="/signup" className={styles.etcBtn}>회원가입</Link>
      </section>
    </div>
  );
};

export default UserLogin;

const CheckBnt = styled(Button)`
  top: 10px;
  width: 40%;
  display: block;
  height: 40px;
  border: 2px solid #108b0c;
  color: white;
  background: #108b0c;
  font-size: 16px;
`;
