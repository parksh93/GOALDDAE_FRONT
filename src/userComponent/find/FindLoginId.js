import React from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

const FindLoginId = ({styles}) => {
  return (
    <div className={styled.findMenuDiv}>
      <TextField
        label="닉네임"
        variant="outlined"
        type="text"
        color="success"
        className={styles.input}
      />
      <br />
      <TextField
        label="이메일"
        variant="outlined"
        type="text"
        color="success"
        className={styles.input}
      />
      <section className={styles.okBtn}>
        <CheckBnt >
          확인
        </CheckBnt>
      </section>
    </div>
  );
};

export default React.memo(FindLoginId);

const CheckBnt = styled(Button)`
  top: 10px;
  width: 45.9%;
  display: block;
  height: 40px;
  border: 2px solid #108b0c;
  color: white;
  background: #108b0c;
  font-size: 16px;
`;

