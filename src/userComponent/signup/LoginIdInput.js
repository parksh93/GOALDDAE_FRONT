import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

export default function LoginIdInput({
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
  setIsCheck,
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const OnChange = (e) => {
    setValue(e.target.value);
    setHelperText('');
    setIsError(false);
  };

  const checkLoginId = useCallback(() => {
    console.log(value);
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
    }
  });

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
        <CheckBnt onClick={checkLoginId} color="success">
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