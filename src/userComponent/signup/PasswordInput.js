import React, { useCallback, useState } from "react";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";

export default function PasswordInput({
  label,
  type,
  value,
  maxValue,
  setValue,
  className,
  // regexCheck,
  successText,
  errorText,
}) {
  const [isErrorPass, setIsErrorPass] = useState(false);
  const [helperTextPass, setHelperTextPass] = useState("");
  const [isErrorPassCheck, setIsErrorPassCheck] = useState(false);
  const [helperTextpassCheck, setHelperTextPassCheck] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const onChangePassword = (e) => {
    setValue(e.target.value);
    setIsErrorPassCheck(false);
    setHelperTextPassCheck('');
};

const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
    setIsErrorPassCheck(false);
    setHelperTextPassCheck('');
};

const onBlueePassConcord = useCallback(() => {
    if(value.trim() !== "" && passwordCheck.trim() !== ""){
        if(value === passwordCheck){
            setIsErrorPassCheck(false);
            setHelperTextPassCheck("비밀번호가 일치합니다.");
        }else{
            setIsErrorPassCheck(true)
            setHelperTextPassCheck("비밀번호가 일치하지 않습니다.")
        }
    }
  });


  return (
      <Container>
        <TextField
          label={label}
          error={isErrorPass}
          helperText={helperTextPass}
          variant="standard"
          type={type}
          onChange={onChangePassword}
          value={value}
          className={className}
          color="success"
          />
        <br />
        <TextField
          label="비밀번호 확인"
          error={isErrorPassCheck}
          helperText={helperTextpassCheck}
          variant="standard"
          type={type}
          onChange={onChangePasswordCheck}
          onBlur={onBlueePassConcord}
          value={passwordCheck}
          className={className}
          color="success"
          />
      </Container>
  );
}
const Container = styled.div`
  position: relative;
`;


