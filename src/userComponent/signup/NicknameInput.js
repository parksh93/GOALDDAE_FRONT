import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

function NicknameInput({
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
  setIsCheck,
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const OnChange = (e) => {
    setValue(e.target.value);
    setHelperText("");
    setIsError(false);
  };

  const checkNickname = useCallback(() => {
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
          } else {
            setHelperText(errorText);
            setIsError(true);
          }
        });
    }else{
      setHelperText("닉네임을 입력하세요.")
      setIsError(true)
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
      <CheckBnt onClick={checkNickname} color="success" className={btnStyle}>
        중복확인
      </CheckBnt>
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
