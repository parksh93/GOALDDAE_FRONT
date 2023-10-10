import React, { useCallback, useState } from "react";
import { useNavigate} from 'react-router-dom'
import styles from "./ChangePassword.module.css";
import ChangeLostPasswordInput from "./ChangePasswordInput";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";

function ChangeLostPasswordMain() {
  const [password, setPassword] = useState("");
  const [passwordOk, setPasswordOk] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertContent, setAlertContent] = useState('');

  const navigate = useNavigate();

  const onClick = () => {
    if(passwordOk) {
      fetch("/user/changePassword",{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: password
        })
      })
      .then((res) => res.json())
      .then(data => {
        if(data[0] === false){
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          setOpen(true);
          setAlertTitle("비밀번호 변경 실패");
          setAlertContent("처리중 예기치 못한 문제가 발생했습니다. 비밀번호 찾기 페이지로 이동합니다.");
          setTimeout(() => {
            setOpen(false)
            navigate("/find/2")
          }, 2000);
        }else{
          navigate("/");
        }
      });
    }else{
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setOpen(true);
      setAlertTitle("비밀번호 변경 실패");
      setAlertContent("처리되지 않은 항목이 있습니다.");
      setTimeout(() => setOpen(false), 2000);
    }
  }

  const onKeyPress = useCallback(e =>{
    if(e.key === "Enter"){
      onClick();
    }
  })
  return (
    <div style={{ position: "relative", height: "500px" }}>
      <Collapse in={open}>
        <Alert severity={"error"}>
          <AlertTitle>
            <b>{alertTitle}</b>
          </AlertTitle>
          {alertContent}          
        </Alert>
      </Collapse>
      <section className={styles.logoSection}>
        <a href="/">
          <img src="https://kr.object.ncloudstorage.com/goalddae-bucket/public/goalddaeLogo.webp" className={styles.logo} />
        </a>
      </section>
      <section className={styles.section}>
      <h2 style={{color:'lightgray', marginTop: "40px"}}>비밀번호 변경</h2>
        <ChangeLostPasswordInput
          label="비밀번호"
          type="password"
          value={password}
          setValue={setPassword}
          maxValue={10}
          errorText="비밀번호 형식을 확인해주세요"
          inputStyle={styles.input}
          divStyle={styles.div}
          setPasswordOk={setPasswordOk}
          onKeyPress={onKeyPress}
        />
      </section>
      <div className={styles.changeBtnDiv}>
        <CheckBnt className={styles.changeBtn} onClick={onClick}>
            비밀번호 변경
        </CheckBnt>
      </div>
    </div>
  );
}

export default React.memo(ChangeLostPasswordMain);
const CheckBnt = styled(Button)`
  top: 10px;
  width: 48%;
  display: block;
  height: 40px;
  border: 2px solid #108b0c;
  color: white;
  background: #108b0c;
  font-size: 16px;
`;
