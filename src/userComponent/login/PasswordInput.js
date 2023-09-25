import React from "react";
import { TextField } from "@mui/material";

function PasswordInput({
  label,
  type,
  value,
  setValue,
  inputStyle,
  onKeyDown
}) {
  const onChange = (e) => {
    setValue(e.target.value.trim());
  };


  return (
    <div>
        <TextField
          label={label}
          variant="outlined"
          type={type}
          onChange={onChange}
          value={value}
          color="success"
          className={inputStyle}
          onKeyDown={onKeyDown}
          />
    </div>
  );
}

export default React.memo(PasswordInput);