import React, { useCallback, useState } from "react";
import { TextField } from "@mui/material";

function PasswordInput({
  label,
  type,
  value,
  maxValue,
  setValue,
  inputStyle,
  divStyle,
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
      <div className={divStyle}>
        <TextField
          label={label}
          error={isErrorPass}
          helperText={helperTextPass}
          variant="outlined"
          type={type}
          onChange={onChangePassword}
          value={value}
          className={inputStyle}
          color="success"
          />
        <br />
        <TextField
          label="비밀번호 확인"
          error={isErrorPassCheck}
          helperText={helperTextpassCheck}
          variant="outlined"
          type={type}
          onChange={onChangePasswordCheck}
          onBlur={onBlueePassConcord}
          value={passwordCheck}
          className={inputStyle}
          style={{marginTop: '20px'}}
          color="success"
          />
      </div>
  );
}

export default React.memo(PasswordInput);

