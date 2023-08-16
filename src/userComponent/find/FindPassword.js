import React, { useState, useCallback } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

const FindPassword = ({ styles, setSeverity, setOpen, setAlertTitle, setAlertContent }) => {
  const [sendMailOk, setSendMailOk] = useState(false);
  const [certified, setCertified] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [certificationcode, setCertificationcode] = useState("");
  const [certificationcodeCheck, setCertificationcodeCheck] = useState("");
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
    
    const onChangCertificationCodeCheck = useCallback(
      (e) => {
        setCertificationcodeCheck(e.target.value.trim());
        setErrorMsg('');
        setOkMsg('');
      },
    [certificationcodeCheck]
    );
    
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
          if(data[0] !== true){
            setOpen(true);
            setSeverity("success");
            setAlertTitle("인증번호 전송 완료");
            setAlertContent("해당 이메일로 인증번호가 전송되었습니다.");
            setTimeout(() => setOpen(false), 2000);

            fetch(`/sendEmailFind/${email}`,{method: "get"})
            .then(res => res.json())
            .then(data => {
              setCertificationcode(data.certificationCode);
              setSendMailOk(true);
            });

          }else {
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
  
  const onClickCheckCertifiCode = useCallback(() => {
    if(certificationcodeCheck !== ""){
      if(certificationcode === certificationcodeCheck){
        setOkMsg("인증되었습니다.");
        setCertified(true);
      }else{
        setErrorMsg("인증번호가 일치하지 않습니다.");
      }
    }else{
      setErrorMsg("인증번호를 입력해주세요.");
    }
  });

  const onClickSubmit = useCallback(() => {
    if(certified) {
      fetch(`/sendEmailChangePassword`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          loginId: loginId,
          email: email
        })
      });
      setOpen(true);
      setSeverity("success");
      setAlertTitle("비밀번호 변경 메일 발송");
      setAlertContent("해당 이메일로 비밀번호를 변경할 수 있는 주소를 발송했습니다.");
      setTimeout(() => setOpen(false), 2000);
    }else {
      setOpen(true);
      setSeverity("error");
      setAlertTitle("비밀번호 찾기 실패");
      setAlertContent("먼저 이메일을 통해 인증해주세요.");
      setTimeout(() => setOpen(false), 2000);
    }
  })
  return (
    <div className={styles.findMenuDiv}>
      <section className={styles.container}>
        <TextField
          label="아이디"
          variant="outlined"
          type="text"
          color="success"
          className={styles.input}
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
          className={styles.input}
          value={email}
          onChange={onChangeEmail}
          style={{marginTop: '20px'}}
          />
        <SendBtn color="success" onClick={onClickSendEmail}>{sendMailOk === true ? "재전송" : "인증번호" }</SendBtn>
        <br />
        {sendMailOk === true ? 
          <div>
            <TextField
              label="인증번호"
              variant="outlined"
              type="text"
              color="success"
              className={styles.input}
              value={certificationcodeCheck}
              onChange={onChangCertificationCodeCheck}
              style={{marginTop: '20px'}}
            />
            <SendBtn color="success" onClick={onClickCheckCertifiCode}>인증</SendBtn>
          </div>
         : "" }
         <p className={styles.errorMsg}>{errorMsg}</p>
         <p className={styles.okMsg}>{okMsg}</p>
      </section>
      <section className={styles.oKBtnSection}>
        <CheckBnt className={styles.okBtn} onClick={onClickSubmit}>확인</CheckBnt>
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

const SendBtn = styled(Button)`
  right: 0;
  width: 100px;
  height: 55px;
  border: 1px solid green;
  color: green;
  font-size: 16px;
  margin-left: 10px;
  margin-top: 20px;
`;
