import React, { useState } from "react";
import { TextField } from "@mui/material";

function NameInput({
  label,
  type,
  value,
  setValue,
  inputStyle,
  divStyle,
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const onChange = (e) => {
    setValue(e.target.value.trim());
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
          onChange={onChange}
          value={value}
          color="success"
          className={inputStyle}
          />
    </div>
  );
}


export default React.memo(NameInput);