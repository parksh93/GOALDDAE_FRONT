import React, { useState, useCallback } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import axios from 'axios';

const FindPassword = ({ styles, setSeverity, setOpen, setAlertTitle, setAlertContent }) => {
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState('');
  const [okMsg,setOkMsg] = useState('');

  const onChangeId = useCallback(
    (e) => {
      setLoginId(e.target.value.trim());
      setErrorMsg('');
    },
    [loginId]
  );

  const onChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value.trim());
      setErrorMsg('');
      setOkMsg('');
    },
    [email]
    );
    
    const onKeyPress = e => {
      if(e.key === "Enter"){
        onClickSendEmail();
      }
    }

    const onClickSendEmail = useCallback(() => {
    if(loginId !== ""){
      if(email !== ""){
        fetch("/user/findPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            loginId: loginId,
            email: email
          })
        }).then(res => res.json())
        .then(data => {
          if(data[0]){
              axios.post(`/sendEmailChangePassword`,{
                  loginId: loginId,
                  email: email,
                },
                {
                  headers: {"Content-Type": "application/json"},
                },
              );

            setEmail('');
            setLoginId('');

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });

            setOpen(true);
            setSeverity("success");
            setAlertTitle("비밀번호 변경 메일 발송");
            setAlertContent("해당 이메일로 비밀번호를 변경할 수 있는 주소를 발송했습니다.");
            setTimeout(() => setOpen(false), 2000);
          }else {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });

            setOpen(true);
            setSeverity("error");
            setAlertTitle("비밀번호 찾기 실패");
            setAlertContent("해당 아이디와 이메일로 가입된 회원이 없습니다. 다시 확인해주세요.");
            setTimeout(() => setOpen(false), 2000);
          }
        })
      }else{
        setErrorMsg("이메일을 입력해주세요.");
      }
    }else{
      setErrorMsg("아이디를 입력해주세요.");
    }
  });
  return (
    <div className={styles.findMenuDiv}>
      <section className={styles.container}>
        <TextField
          label="아이디"
          variant="outlined"
          type="text"
          color="success"
          className={styles.inputFindPassword}
          value={loginId}
          onChange={onChangeId}
          style={{marginTop: '20px'}}
        />
        <br />
        <TextField
          label="이메일"
          variant="outlined"
          type="text"
          color="success"
          className={styles.inputFindPassword}
          value={email}
          onChange={onChangeEmail}
          style={{marginTop: '20px'}}
          onKeyDown={onKeyPress}
          /> 
         <p className={styles.errorMsg}>{errorMsg}</p>
         <p className={styles.okMsg}>{okMsg}</p>
      </section>
      <section className={styles.oKBtnSection}>
        <CheckBnt className={styles.okBtn} onClick={onClickSendEmail}>확인</CheckBnt>
      </section>
    </div>
  );
};

export default React.memo(FindPassword);

const CheckBnt = styled(Button)`
  top: 10px;
  width: 53%;
  display: block;
  height: 40px;
  border: 2px solid #108b0c;
  color: white;
  background: #108b0c;
  font-size: 16px;
`;
