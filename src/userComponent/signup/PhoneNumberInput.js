import React, { useState } from "react";
import { TextField } from "@mui/material";

function PhoneNumberInput({
  label,
  type,
  value,
  setValue,
  inputStyle,
  divStyle,
  setPhoneNumberOk
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const numberRegEx = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;

  const onChange = (e) => {
    setValue(e.target.value.trim());
    setHelperText('');
    setIsError(false);
    setPhoneNumberOk(false);
  };

  const onBlue = e => {
    if(e.target.value !== ""){
      if(!numberRegEx.test(e.target.value)){
        setHelperText("핸드폰번호를 다시 확인해 주세요.");
        setIsError(true)
        setPhoneNumberOk(false);
      }else{
        setPhoneNumberOk(true);
      }
    }
  }

  return (
    <div className={divStyle}>
        <TextField
          label={label}
          error={isError}
          helperText={helperText}
          variant="outlined"
          type={type}
          onChange={onChange}
          value={value}
          color="success"
          className={inputStyle}
          onBlur={onBlue}
          />
          <p style={{fontSize:'10px'}}>* 핸드폰 번호는 "-" 이나 문자 없이 입력해주세요.</p>
    </div>
  );
}

export default PhoneNumberInput;