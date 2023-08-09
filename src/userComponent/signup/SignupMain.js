import React, { useState } from "react";
import styles from "./Signup.module.css";
// import regex from "../src/Shared/regex";
import LoginIdInput from "./LoginIdInput";
import EmailInput from "./EmailInput";
import CertificateInput from "./CertificateInput";
import NicknameInput from "./NicknameInput";
import Checkbox from "@mui/material/Checkbox";
import PasswordInput from "./PasswordInput";
import { Button, Radio, RadioGroup } from "@mui/material";
import Footer from "../../Footer";
import PhoneNumberInput from "./PhoneNumberInput";
import styled from "@emotion/styled";

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
        <a href="/">
          <img src="./img/goalddaeLogo.png" className={styles.logo} />
        </a>
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
          inputStyle={styles.input}
          divStyle={styles.div}
          btnStyle={styles.submitBtn}
        />
        <PasswordInput
          label="비밀번호"
          type="password"
          value={password}
          setValue={setPassword}
          // regexCheck={regex.password}
          maxValue={10}
          errorText="비밀번호 형식을 확인해주세요"
          inputStyle={styles.input}
          divStyle={styles.div}
        />
        <EmailInput
          label="이메일"
          value={email}
          setValue={setEmail}
          certificateCode={certificationCode}
          setCertifi={setCertificationCode}
          // regexCheck={regex.email}
          successText="인증번호가 전송되었습니다."
          errorText="이메일 형식을 확인해주세요"
          inputStyle={styles.input}
          divStyle={styles.div}
          btnStyle={styles.submitBtn}
        />
        {certificationCode !== "" ?
            <CertificateInput
            label="인증번호"
            cerVal={certificationCode}
            value={certificateCheck}
            setValue={setCertificateCheck}
            // regexCheck={regex.email}
            successText="확인되었습니다."
            errorText="인증번호가 일치하지 않습니다"
            inputStyle={styles.input}
            divStyle={styles.div}
            btnStyle={styles.submitBtn}
            />
          :''
        }
        <NicknameInput
          label="닉네임"
          value={nickname}
          setValue={setNickname}
          // regexCheck={regex.email}
          successText="사용 가능한 닉네임입니다."
          errorText="사용할 수 없는 닉네임입니다."
          inputStyle={styles.input}
          divStyle={styles.div}
          btnStyle={styles.submitBtn}
        />
        <PhoneNumberInput
          label="핸드폰 번호"
          value={phoneNumber}
          setValue={setPhoneNumber}
          // regexCheck={regex.email}
          successText="확인"
          errorText="전화번호 형식을 다시 확인해주세요."
          inputStyle={styles.input}
          divStyle={styles.div}
        />
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          className={styles.genderRadioCotain}
          color="success"
        >
          <Radio value="남성" className={styles.genderRadio} color="success" id="male"/> <label className={styles.genderText} htmlFor="male">남성</label>
          <Radio value="여성" className={styles.genderRadio} color="success" id="female"/> <label className={styles.genderText} htmlFor="female">여성</label>
        </RadioGroup>
      </section>
        <div className={styles.singupBtnDiv}>
          <Checkbox color="success"/>
          <a href="#" className={styles.terms}>개인정보 이용약관</a>에 대해 동의합니다.

          <CheckBnt className={styles.singupBtn}>
            회원가입
          </CheckBnt>
        </div>
      <Footer />
    </div>
  );
};

export default SignupMain;

const CheckBnt = styled(Button)`
  top: 10px;
  width: 55%;
  display: block;
  height: 40px;
  border: 2px solid #108B0C;
  color: white;
  background: #108B0C;
  font-size: 16px;
`;
