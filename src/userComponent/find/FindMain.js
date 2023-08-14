import React, { useState, useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import { useParams, Link } from "react-router-dom";
import styles from "./Find.module.css";
import FindLoginId from "./FindLoginId";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";

const FindMain = () => {
  let { findMenuNum } = useParams();

  if (findMenuNum === undefined) {
    findMenuNum = "1";
  }

  const [findMenu, setFindMenu] = useState(findMenuNum);
  const [idStyle, setIdStyle] = useState({
    background: "",
    color: "",
  });
  const [pwStyle, setPwStyle] = useState({
    background: "",
    color: "",
  });
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertContent, setAlertContent] = useState('');

  useEffect(() => {
    if (findMenu === "1") {
      setIdStyle({
        background: "green",
        color: "white",
      });
      setPwStyle({
        background: "white",
        color: "green",
      });
    }else{
      setIdStyle({
        background: "white",
        color: "green",
      });
      setPwStyle({
        background: "green",
        color: "white",
      });
    }
  }, []);

  const onClickId = useCallback(() => {
    setFindMenu("1");
    setIdStyle({
      background: "green",
      color: "white",
    });
    setPwStyle({
      background: "white",
      color: "green",
    });
  });

  const onClickPw = useCallback(() => {
    setFindMenu("2");
    setIdStyle({
      background: "white",
      color: "green",
    });
    setPwStyle({
      background: "green",
      color: "white",
    });
  });

  return (
    <div>
      <Collapse in={open}>
        <Alert severity={severity}>
          <AlertTitle>
            <b>{alertTitle}</b>
          </AlertTitle>
          {alertContent}          
        </Alert>
      </Collapse>
      <section className={styles.logoSection}>
        <Link to="/">
          <img src="../img/goalddaeLogo.png" className={styles.logo} />
        </Link>
      </section>
      <section className={styles.findBtnSection}>
        <Button
          size="large"
          onClick={onClickId}
          color="success"
          className={styles.findIdBtn}
          style={idStyle}
        >
          아이디 찾기
        </Button>
        <Button
          size="large"
          onClick={onClickPw}
          color="success"
          className={styles.findPwBtn}
          style={pwStyle}
        >
          비밀번호 찾기
        </Button>
      </section>
      <section className={styles.mainSession}>
        {findMenu === "1" ? (
          <FindLoginId 
            styles={styles} 
            setOpen={setOpen}
            setSeverity = {setSeverity}
            setAlertTitle= {setAlertTitle}
            setAlertContent = {setAlertContent}
          />
        ) : (
          "비밀번호 찾기화면"
        )}
      </section>
    </div>
  );
};

export default React.memo(FindMain);
