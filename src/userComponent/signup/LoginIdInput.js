import React, { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

function LoginIdInput({
  label,
  type,
  value,
  setValue,
  inputStyle,
  divStyle,
  btnStyle,
  successText,
  errorText,
  setLoginIdOk
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const OnChange = (e) => {
    setValue(e.target.value.trim());
    setHelperText('');
    setIsError(false);
    setLoginIdOk(false)
  };

  const checkLoginId = useCallback(() => {
    if (value.trim() !== "") {
        if(value.length <= 10 && value.length >= 5){
        fetch(`/user/checkLoginId`, {
          method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          loginId: value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data[0] === true) {
            setIsError(false);
            setHelperText(successText);
            setLoginIdOk(true)
          } else {
            setIsError(true);
            setHelperText(errorText);
            setLoginIdOk(false);
          }
        });
      }else{
        setHelperText("올바르지 않은 아이디입니다.")
        setIsError(true);
        setLoginIdOk(false);
      }
    }else{
      setHelperText("아이디를 입력하세요.")
      setIsError(true);
      setLoginIdOk(false);
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
          />
        <CheckBnt onClick={checkLoginId} className={btnStyle}>
          중복확인
        </CheckBnt>
        <p style={{fontSize: "10px"}}>* 아이디는 최소 5글자에서 최대 10글자까지 가능합니다.</p>
    </div>
  );
}

export default React.memo(LoginIdInput);

const CheckBnt = styled(Button)`
right: 0;
width: 100px;
height: 55px;
border: 1px solid green;
color: green;
font-size: 16px;
margin-left: 10px;
`;