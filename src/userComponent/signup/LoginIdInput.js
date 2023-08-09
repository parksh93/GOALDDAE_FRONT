import React, { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

function LoginIdInput({
  label,
  type,
  value,
  maxValue,
  setValue,
  inputStyle,
  divStyle,
  btnStyle,
  //   regexCheck,
  successText,
  errorText,
  isCheck,
  setIsCheck
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const OnChange = (e) => {
    setValue(e.target.value);
    setHelperText('');
    setIsError(false);
  };

  const checkLoginId = useCallback(() => {
    if (value.trim() !== "") {

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
        } else {
            setIsError(true);
            setHelperText(errorText);
          }
        });
    }else{
      setHelperText("아이디를 입력하세요.")
      setIsError(true);
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