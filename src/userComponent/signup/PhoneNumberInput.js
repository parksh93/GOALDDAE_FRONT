import React, { useState } from "react";
import { TextField } from "@mui/material";

function PhoneNumberInput({
  label,
  type,
  value,
  maxValue,
  setValue,
  inputStyle,
  divStyle,
  //   regexCheck,
  successText,
  errorText,
  isCheck,
  setIsCheck
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const OnChange = (e) => {
    setValue(e.target.value);
    setHelperText('');
    setIsError(false);
  };


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
    </div>
  );
}

export default PhoneNumberInput;