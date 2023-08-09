import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

export default function NicknameInput({
  label,
  type,
  value,
  maxValue,
  setValue,
  className,
  //   regexCheck,
  successText,
  errorText,
  handleValueCheck,
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

  const checkNickname = useCallback(() => {
    fetch("/user/checkNickname",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nickname: value
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data[0] === true){
            setHelperText(successText);
            setIsError(false);
        }else{
            setHelperText(errorText);
            setIsError(true);
        }
    })
})

  return (
    <Container>
        <TextField
          label={label}
          error={isError}
          helperText={helperText}
          variant="standard"
          type={type}
          onChange={OnChange}
          value={value}
          color="success"
          className={className}
        />
        <CheckBnt onClick={checkNickname} color="success">
          중복확인
        </CheckBnt>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const CheckBnt = styled(Button)`
  right: 0;
  top: 10px;
  width: 100px;
  height: 40px;
  border: 2px solid green;
  color: green;
  font-size: 16px;
  border-radius: 100px;
`;