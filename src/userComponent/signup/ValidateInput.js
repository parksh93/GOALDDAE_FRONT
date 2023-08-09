import React, { useState } from "react";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";

export default function ValidationInput({
  label,
  type,
  value,
  className,
  maxValue,
  setValue,
  // regexCheck,
  successText,
  errorText
}) {
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const HandleOnChange = (e) => {
    //최대값이 지정되어있으면 value를 저장하지 않는다.
    // if (maxValue && maxValue < e.target.value.length) return;

    setValue(e.target.value);

    // if (regexCheck) {
    //   // 정규표현식체크가 통과되면 successText를 송출하고 아니면 errorText를 송출한다
    //   if (regexCheck.test(e.target.value)) {
    //     setIsError(false);
    //     return setHelperText(successText);
    //   }
    //   if (!regexCheck.test(e.target.value)) {
    //     setIsError(true);
    //     setHelperText(errorText);
    //   }
    // }

    };

  return (
    <Container>
      <TextField
            label={label}
            error={isError}
            helperText={helperText}
            variant="standard"
            type={type}
            onChange={HandleOnChange}
            value={value}
            className={className}
        />
    </Container>
  );
}
const Container = styled.div`
  position: relative;
`;
