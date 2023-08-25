import React, { useCallback, useState } from "react";
import { TextField } from "@mui/material";
import { CiRead } from "react-icons/ci";
import { CiUnread } from "react-icons/ci";
import styles from "./ChangePassword.module.css"

function ChangeLostPassword({
  label,
  type,
  value,
  setValue,
  inputStyle,
  divStyle,
  errorText,
  setPasswordOk,
  onKeyPress
}) {
  const [isErrorPass, setIsErrorPass] = useState(false);
  const [helperTextPass, setHelperTextPass] = useState("");
  const [isErrorPassCheck, setIsErrorPassCheck] = useState(false);
  const [helperTextpassCheck, setHelperTextPassCheck] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const passwordRegEx = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/

  const handleClickShowPassword = () => {
    if(showPassword){
      setShowPassword(false);
    }else{
      setShowPassword(true);
    }
  }

  const handleClickShowPasswordCheck = () => {
    if(showPasswordCheck){
      setShowPasswordCheck(false);
    }else{
      setShowPasswordCheck(true);
    }
  }

  const onChangePassword = (e) => {
    setValue(e.target.value.trim());
    setIsErrorPassCheck(false);
    setHelperTextPassCheck('');
    setHelperTextPass('');
    setIsErrorPass(false);
    setPasswordOk(false);
    setPasswordCheck('')
};

const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value.trim());
    setIsErrorPassCheck(false);
    setHelperTextPassCheck('');
    setPasswordOk(false);
};

const checkPassword = useCallback(e => {
  if(e.target.value.trim() !== ""){
    if(passwordRegEx.test(e.target.value)){
      onBluePassConcord();
    }else {
      setIsErrorPass(true);
      setHelperTextPass(errorText)
      setPasswordOk(false);
    }
  }
});

const onBluePassConcord = useCallback(() => {
    if(value.trim() !== "" && passwordCheck.trim() !== ""){
        if(value === passwordCheck){
            setIsErrorPassCheck(false);
            setHelperTextPassCheck("");
            setPasswordOk(true);
        }else{
            setIsErrorPassCheck(true)
            setHelperTextPassCheck("비밀번호가 일치하지 않습니다.")
            setPasswordOk(false);
        }
    }
  });

  return (
      <div className={divStyle} style={{position: 'relative'}}>
        <TextField
          label={label}
          error={isErrorPass}
          helperText={helperTextPass}
          variant="outlined"
          type={showPassword ? "text" : type}
          onChange={onChangePassword}
          value={value}
          className={inputStyle}
          color="success"
          onBlur={checkPassword}
          />
          <button onClick={handleClickShowPassword}  className={styles.passShowBtn} >
            {showPassword ? <CiRead className={styles.key}/> : <CiUnread className={styles.key}/>}
          </button>
        <p style={{fontSize: '10px'}}>* 비밀번호는 알파벳과 숫자가 모두 들어가야하며, 8~10자리여야 합니다.</p>
        <TextField
          label="비밀번호 확인"
          error={isErrorPassCheck}
          helperText={helperTextpassCheck}
          variant="outlined"
          type={showPasswordCheck ? "text" : type}
          onChange={onChangePasswordCheck}
          onBlur={onBluePassConcord}
          value={passwordCheck}
          className={inputStyle}
          style={{marginTop: '20px'}}
          color="success"
          onKeyDown={onKeyPress}
          />
          <button onClick={handleClickShowPasswordCheck}  className={styles.passShowBtn} >
            {showPasswordCheck ? <CiRead className={styles.checkKey}/> : <CiUnread className={styles.checkKey}/>}
          </button>
      </div>
  );
}

export default React.memo(ChangeLostPassword);

