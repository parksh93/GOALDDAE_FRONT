import React, { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

function EmailInput({
  label,
  type,
  value,
  maxValue,
  setValue,
  //   regexCheck,
  successText,
  errorText,
  inputStyle,
  divStyle,
  btnStyle,
  isCheck,
  setIsCheck,
  setCertifi,
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const OnChange = (e) => {
    setValue(e.target.value);
    setHelperText("");
    setIsError(false);
  };
  const sendEmail = useCallback(() => {
    if (value.trim() !== "") {
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
            setIsError(true);
          } else {
            setHelperText(successText);
            setIsError(false);
            setCertifi(data.certificationCode);
          }
        });
    }else{
      setHelperText("이메일을 입력하세요.");
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
      <CheckBnt onClick={sendEmail} color="success" className={btnStyle}>
        인증번호
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
