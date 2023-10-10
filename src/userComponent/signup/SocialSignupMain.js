import React, { useCallback, useEffect, useState } from "react";
import styles from "./Signup.module.css";
import LoginIdInput from "./LoginIdInput";
import EmailInput from "./EmailInput";
import CertificateInput from "./CertificateInput";
import NicknameInput from "./NicknameInput";
import Checkbox from "@mui/material/Checkbox";
import PasswordInput from "./PasswordInput";
import { Button } from "@mui/material";
import PhoneNumberInput from "./PhoneNumberInput";
import styled from "@emotion/styled";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import GenderRaido from "./GenderRaido";
import BirthInput from "./BirthInput";
import SignupModal from "./SignupModal";
import { useNavigate, useLocation } from "react-router-dom";
import TermsModal from "./TermsModal";
import NameInput from "./NameInput";

const SocialSignupMain = () => {

  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");

  const [nicknameOk, setNicknameOk] = useState(false);
  const [phoneNumberOk, setPhoneNumberOk] = useState(false);
  const [checked, setChecked] = useState(false);

  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [activityClass, setActivityClass] = useState(0);

  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [signOk, setSignOk] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const {email} = location.state;

  const onChangeCheckBox = useCallback(() => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  });

  const openTermsModal = () => {
    setTermsModalOpen(true);
  };

  const submit = useCallback(() => {
    if (
      nicknameOk &&
      phoneNumberOk &&
      checked &&
      gender !== "" &&
      birth !== ""
    ) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setOpen(true);
      setAlertSeverity("success");
      setAlertTitle("회원가입 성공");
      setAlertMsg("회원가입을 축하드립니다. 잠시후 메인 페이지로 이동합니다.");

      setModalOpen(true);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setOpen(true);
      setAlertSeverity("error");
      setAlertTitle("회원가입 실패");
      setAlertMsg(
        "입력하지 않았거나, 완료되지 않은 작업이 있습니다. 다시 확인해주세요."
      );
      setTimeout(() => setOpen(false), 3000);
    }
  });

  useEffect(() => {
    if (signOk) {
      fetch("/user/socialSignup", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          nickname: nickname,
          phoneNumber: phoneNumber,
          birth: birth,
          gender: gender,
          preferredCity: city,
          preferredArea: area,
          activityClass: activityClass,
        }),
      }).then(() => {
        setModalOpen(false);
        navigate("/");
      });
    }
  }, [signOk]);
  return (
    <div className={styles.container}>
      <Collapse in={open}>
        <Alert severity={alertSeverity}>
          <AlertTitle>
            <b>{alertTitle}</b>
          </AlertTitle>
          {alertMsg}
        </Alert>
      </Collapse>
      <section className={styles.logoSection}>
        <a href="/">
          <img src="https://kr.object.ncloudstorage.com/goalddae-bucket/public/goalddaeLogo.webp" className={styles.logo} />
        </a>
      </section>
      <section className={styles.section}>
        <NicknameInput
          label="닉네임"
          value={nickname}
          setValue={setNickname}
          successText="사용 가능한 닉네임입니다."
          errorText="사용할 수 없는 닉네임입니다."
          inputStyle={styles.input}
          divStyle={styles.div}
          btnStyle={styles.submitBtn}
          setNicknameOk={setNicknameOk}
        />
        <PhoneNumberInput
          label="핸드폰 번호"
          value={phoneNumber}
          setValue={setPhoneNumber}
          successText="확인"
          errorText="전화번호 형식을 다시 확인해주세요."
          inputStyle={styles.input}
          divStyle={styles.div}
          setPhoneNumberOk={setPhoneNumberOk}
        />
        <BirthInput styles={styles} birth={birth} setBirth={setBirth} />
        <GenderRaido styles={styles} setGender={setGender} />
      </section>
      <div className={styles.singupBtnDiv}>
        <Checkbox
          color="success"
          checked={checked}
          onChange={onChangeCheckBox}
        />
        <span className={styles.essential}>(필수) </span>
        <a onClick={openTermsModal} className={styles.terms}>
          개인정보 수집 및 이용약관
        </a>
        에 동의합니다.
        <CheckBnt className={styles.singupBtn} onClick={submit}>
          추가 정보 입력
        </CheckBnt>
        <TermsModal
          onChangeCheckBox={onChangeCheckBox}
          checked={checked}
          styles={styles}
          modalOpen={termsModalOpen}
          setModalOpen={setTermsModalOpen}
        />
        <SignupModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          styles={styles}
          city={city}
          setCity={setCity}
          area={area}
          setArea={setArea}
          activityClass={activityClass}
          setActivityClass={setActivityClass}
          setSignOk={setSignOk}
        />
      </div>
    </div>
  );
};

export default SocialSignupMain;

const CheckBnt = styled(Button)`
  top: 10px;
  width: 55%;
  display: block;
  height: 40px;
  border: 2px solid #108b0c;
  color: white;
  background: #108b0c;
  font-size: 16px;
`;
