import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

export default function CertificateInput({
  label,
  type,
  value,
  cerVal,
  setValue,
  //   regexCheck,
  successText,
  errorText,
  className,
  handleValueCheck,
  isCheck,
  setIsCheck,
  setCertifi,
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const OnChange = (e) => {
    setValue(e.target.value);
    setHelperText('');
    setIsError(false);
  };

  const onClick = useCallback(() => {
    console.log(value)
    console.log(cerVal)
    if (value === cerVal) {
      setHelperText(successText);
      setIsError(false);
    } else {
      setHelperText(errorText);
      setIsError(true);
    }
  });

  return (
    <div>
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
        <CheckBnt onClick={onClick} color="success">
          인증
        </CheckBnt>
    </div>
  );
}

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
