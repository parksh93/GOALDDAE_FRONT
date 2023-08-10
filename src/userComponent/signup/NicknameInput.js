import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

function NicknameInput({
  label,
  type,
  value,
  setValue,
  inputStyle,
  divStyle,
  btnStyle,
  successText,
  errorText,
  setNicknameOk
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const OnChange = (e) => {
    setValue(e.target.value.trim());
    setHelperText("");
    setIsError(false);
    setNicknameOk(false);
  };

  const checkNickname = useCallback(() => {
    if(value.length <= 5){
      if (value.trim() !== "") {
        fetch("/user/checkNickname", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        body: JSON.stringify({
          nickname: value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data[0] === true) {
            setHelperText(successText);
            setIsError(false);
            setNicknameOk(true);
          } else {
            setHelperText(errorText);
            setIsError(true);
            setNicknameOk(false);
          }
        });
    }else{
      setHelperText("닉네임을 입력하세요.");
      setIsError(true);
      setNicknameOk(false);
    }
  }else{
    setHelperText("유효하지 않은 닉네임입니다.");
    setIsError(true);
    setNicknameOk(false);
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
      <CheckBnt onClick={checkNickname} color="success" className={btnStyle} st>
        중복확인
      </CheckBnt>
      <p style={{fontSize:"10px"}}>* 닉네임은 5글자까지 입력 가능합니다.</p>
    </div>
  );
}

export default React.memo(NicknameInput);

const CheckBnt = styled(Button)`
  right: 0;
  width: 100px;
  height: 55px;
  border: 1px solid green;
  color: green;
  font-size: 16px;
  margin-left: 10px;
`;
