import React, { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

function EmailInput({
  label,
  type,
  value,
  setValue,
  successText,
  errorText,
  inputStyle,
  divStyle,
  btnStyle,
  certificateCode,
  setCertifi,
  setEmailOk
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [regexCheck, setRegexCheck] = useState(false);
  const emailRegEx =  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const OnChange = (e) => {
    setValue(e.target.value.trim());
    setHelperText("");
    setIsError(false);
    setEmailOk(false);
  };

  const checkEmail = (e) => {
    if(e.target.value.trim() !== ""){
      if(emailRegEx.test(e.target.value)) {
        setRegexCheck(true);
      }else{
        setRegexCheck(false);
        setHelperText(errorText);
        setIsError(true);
        setEmailOk(false);
      }
    }
}

  const sendEmail = useCallback(() => {
    if (value.trim() !== "" && regexCheck) {
      fetch(`/sendEmail`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === false) {
            setHelperText(errorText);
            setHelperText("이미 사용중인 이메일입니다.")
            setIsError(true);
            setEmailOk(false);
          } else {
            setHelperText(successText);
            setIsError(false);
            setCertifi(data.certificationCode);
            setEmailOk(true);
          }
        });
    }else{
      setHelperText("이메일을 입력하세요.");
      setIsError(true);
      setEmailOk(false);
    }
  });

  return (
    <div className={divStyle}>
      <TextField
        label={label}
        error={isError}
        helperText={helperText}
        variant="outlined"
        type={type}
        onChange={OnChange}
        value={value}
        color="success"
        className={inputStyle}
        onBlur={checkEmail}
      />
      <CheckBnt onClick={sendEmail} color="success" className={btnStyle}>
        {certificateCode === "" ? "인증번호" : "재전송"}
      </CheckBnt>
    </div>
  );
}

export default React.memo(EmailInput);

const CheckBnt = styled(Button)`
  right: 0;
  width: 100px;
  height: 55px;
  border: 1px solid green;
  color: green;
  font-size: 16px;
  margin-left: 10px;
`;
