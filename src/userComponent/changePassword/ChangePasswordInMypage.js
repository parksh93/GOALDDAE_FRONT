import React, { useCallback, useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import styles from "./ChangePassword.module.css";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function ChangePasswordInMypage() {
  const { userId } = useParams();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50', 
      },
    },
  });


  const onClick = () => {
    if (newPassword === confirmPassword) {

      const requestData = {
        id: userId,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      fetch("/user/changePasswordInMypage", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      })
        .then((res) => res.text()) // 텍스트로 응답을 가져옴
        .then(data => {
          if (data === "비밀번호가 변경되었습니다.") {
            // 변경에 성공하면 메인 페이지를 새로 고침
            window.location.href = '/'; 
          } else {
            // 변경 실패 시 처리
            handlePasswordChangeFailure();
          }
        })
        .catch((error) => {
          console.error("비밀번호 변경 요청에 실패했습니다.", error);
          // 변경 실패 시 처리
          handlePasswordChangeFailure();
        });
    } else {
      // 새 비밀번호와 확인 비밀번호가 일치하지 않는 경우 처리
      handlePasswordChangeFailure();
    }
  }

  // 비밀번호 변경 실패 시 처리
  const handlePasswordChangeFailure = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setOpen(true);
    setAlertTitle("비밀번호 변경 실패");
    setAlertContent("처리 중 예기치 못한 문제가 발생했습니다. 비밀번호 찾기 페이지로 이동합니다.");
    setTimeout(() => {
      setOpen(false);
      navigate("/find/2");
    }, 2000);
  }

  const onKeyPress = useCallback(e => {
    if (e.key === "Enter") {
      onClick();
    }
  })

  return (
    <ThemeProvider theme={theme}>
    <div style={{ position: "relative", marginLeft: '50px' }}>
      <Collapse in={open}>
        <Alert severity={"error"}>
          <AlertTitle>
            <b>{alertTitle}</b>
          </AlertTitle>
          {alertContent}
        </Alert>
      </Collapse>
      <section className={styles.section}>
        <h2 style={{ color: 'lightgray', marginBottom: '40px' }}>비밀번호 변경</h2>
        <p>
          <TextField
            label="현재 비밀번호"
            type="password"
            value={oldPassword}
            variant="outlined"
            fullWidth
            onChange={(e) => setOldPassword(e.target.value)}
            onKeyDown={onKeyPress}
            style={{ maxWidth: "300px" }}
          />
        </p>
        <p>
          <TextField
            label="새 비밀번호"
            type="password"
            value={newPassword}
            variant="outlined"
            fullWidth
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyDown={onKeyPress}
            style={{ maxWidth: "300px" }}
          />
        </p>
        <p>
          <TextField
            label="새 비밀번호 확인"
            type="password"
            value={confirmPassword}
            variant="outlined"
            fullWidth
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={onKeyPress}
            style={{ maxWidth: "300px" }}
          />
        </p>
      </section>
      <div className={styles.changeBtnDiv}>
        <CheckBtn className={styles.changeBtn} onClick={onClick}>
          비밀번호 변경
        </CheckBtn>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default React.memo(ChangePasswordInMypage);

const CheckBtn = styled(Button)`
  top: 10px;
  width: 48%;
  display: block;
  height: 40px;
  border: 2px solid #108b0c;
  color: white;
  background: #108b0c;
  font-size: 16px;
  width: 300px;
`;
