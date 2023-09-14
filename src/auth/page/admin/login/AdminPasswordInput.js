import React, { useState } from "react";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";

function AdminPasswordInput({
  label,
  type,
  value,
  setValue,
  inputStyle,
  onKeyPress,
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
          className={inputStyle}
          onKeyDown={onKeyPress}
          />
    </div>
  );
}

export default React.memo(AdminPasswordInput);