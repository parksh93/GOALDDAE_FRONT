import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

export default function EmailInput({
  label,
  type,
  value,
  maxValue,
  setValue,
  //   regexCheck,
  successText,
  errorText,
  className,
  handleValueCheck,
  isCheck,
  setIsCheck,
  setCertifi
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const OnChange = (e) => {
    setValue(e.target.value);
    setHelperText('');
    setIsError(false);
  };
  const sendEmail = useCallback(() => {
    fetch(`/sendEmail`,{
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: value
        })
    })
    .then(res => res.json())
    .then(data => {
       if(data === false){
           setHelperText(errorText);
           setIsError(true);
        }else{
            setHelperText(successText);
            setIsError(false);
            setCertifi(data.certificationCode);
       }
    });
},);

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
        <CheckBnt onClick={sendEmail} color="success">
          인증번호
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