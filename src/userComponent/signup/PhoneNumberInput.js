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
  const numberRegEx = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

  const onChange = (e) => {
    setValue(e.target.value.trim().replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`));
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
          <p style={{fontSize:'10px'}}>* 핸드폰 번호는 "-" 이 자동으로 생기니 "-"없이 숫자만 입력해주세요.</p>
    </div>
  );
}

export default PhoneNumberInput;