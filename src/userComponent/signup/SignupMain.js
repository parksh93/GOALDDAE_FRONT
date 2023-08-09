import React, { useCallback, useState } from "react";
import styles from "C:/goalddae_frontend/frontend/src/css/user/Signup.module.css";
// import regex from "../src/Shared/regex";
import ValidationInput from "./ValidateInput";
import LoginIdInput from "./LoginIdInput";
import EmailInput from "./EmailInput";
import CertificateInput from "./CertificateInput";
import NicknameInput from "./NicknameInput";
import Checkbox from "@mui/material/Checkbox";
import PasswordInput from "./PasswordInput";

const SignupMain = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [certificationCode, setCertificationCode] = useState("");
  const [certificateCheck, setCertificateCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className={styles.container}>
      <section className={styles.logoSection}>
        <a href="/"><img src="./img/goalddaeLogo.png" className={styles.logo} /></a>
      </section>
      <section className={styles.section}>
        <LoginIdInput
          label="아이디"
          value={loginId}
          setValue={setLoginId}
          maxValue={10}
          // regexCheck={regex.nickname}
          successText="사용 가능한 아이디입니다."
          errorText="사용할 수 없는 아이디입니다."
          className={styles.input}
        />
        <PasswordInput
          label="비밀번호"
          type="password"
          value={password}
          setValue={setPassword}
          // regexCheck={regex.password}
          maxValue={10}
          errorText="비밀번호 형식을 확인해주세요"
          className={styles.input}
        />
        <EmailInput
          label="이메일"
          value={email}
          setValue={setEmail}
          setCertifi={setCertificationCode}
          // regexCheck={regex.email}
          successText="인증번호가 전송되었습니다."
          errorText="이메일 형식을 확인해주세요"
          className={styles.input}
        />
        <CertificateInput
          label="인증번호"
          cerVal={certificationCode}
          value={certificateCheck}
          setValue={setCertificateCheck}
          // regexCheck={regex.email}
          successText="확인되었습니다."
          errorText="인증번호가 일치하지 않습니다"
          className={styles.input}
        />
        <NicknameInput
          label="닉네임"
          value={nickname}
          setValue={setNickname}
          // regexCheck={regex.email}
          successText="사용 가능한 닉네임입니다."
          errorText="사용할 수 없는 닉네임입니다."
          className={styles.input}
        />
        <ValidationInput
          label="핸드폰 번호"
          value={phoneNumber}
          setValue={setPhoneNumber}
          // regexCheck={regex.email}
          successText="확인"
          errorText="전화번호 형식을 다시 확인해주세요."
          className={styles.input}
        />
        <Checkbox defaultChecked color="success" />
        <a href="#">개인정보 이용약관</a>에 대해 동의합니다.
      </section>
    </div>
  );
};

export default SignupMain;
