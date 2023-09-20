import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminLogin.module.css";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import { useAdmin } from "../AdminContext";
import AdminIdInput from "./AdminIdInput";
import AdminPasswordInput from "./AdminPasswordInput";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheckMsg, setLoginCheckMsg] = useState("");
  const [open, setOpen] = useState(false);
  const {getAdminInfo} = useAdmin();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#black', 
      },
    },
  });

  const onKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      submitLogin();
    }
  });

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
        getAdminInfo();
        navigate("/admin");
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
    <div className={styles.LoginMainDiv}>
      <ThemeProvider theme={theme}>

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
          <img src="../img/goalddaeLogo.png" className={styles.logo} />
        </a>
      </section>
      <section className={styles.loginSection}>
        <AdminIdInput
          label="아이디"
          value={loginId}
          setValue={setLoginId}
          inputStyle={styles.input}
          onKeyPress={onKeyPress}
          type="text"
          />
      </section>
      <section className={styles.loginSection}>
        <AdminPasswordInput
          label="비밀번호"
          value={password}
          setValue={setPassword}
          inputStyle={styles.input}
          onKeyPress={onKeyPress}
          type="password"
          />
      </section>
      <p className={styles.msg}>{loginCheckMsg}</p>
      <section className={styles.loginBtnSection}>
        <CheckBnt className={styles.loginBtn} onClick={submitLogin}>
          로그인
        </CheckBnt>
      </section>
      </ThemeProvider>
    </div>
  );
};

export default AdminLogin;

const CheckBnt = styled(Button)`
  top: 10px;
  width: 40%;
  display: block;
  height: 40px;
  border: 2px solid black;
  color: white;
  background: black;
  font-size: 16px;
`;

