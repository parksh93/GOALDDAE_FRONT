import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

function CertificateInput({
  label,
  type,
  value,
  cerVal,
  setValue,
  //   regexCheck,
  successText,
  errorText,
  inputStyle,
  divStyle,
  btnStyle,
  handleValueCheck,
  isCheck,
  setIsCheck,
  setCertifi,
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const OnChange = (e) => {
    setValue(e.target.value);
    setHelperText("");
    setIsError(false);
  };

  const onClick = useCallback(() => {
    if(value.trim() !== ""){

      if (value === cerVal) {
        setHelperText(successText);
        setIsError(false);
      } else {
        setHelperText(errorText);
        setIsError(true);
      }
    }else{
      setHelperText("인증번호를 입력하세요.")
      setIsError(true);
    }
  });

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
      <CheckBnt onClick={onClick} color="success" className={btnStyle}>
        인증
      </CheckBnt>
    </div>
  );
}

export default React.memo(CertificateInput);

const CheckBnt = styled(Button)`
  right: 0;
  width: 100px;
  height: 55px;
  border: 1px solid green;
  color: green;
  font-size: 16px;
  margin-left: 10px;
`;
