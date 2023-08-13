import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useParams, Link } from "react-router-dom";
import styles from "./Find.module.css";
import FindLoginId from "./FindLoginId";


const FindMain = () => {
  let { findMenuNum } = useParams();

  if (findMenuNum === undefined) {
    findMenuNum = "1";
  }

  const [findMenu, setFindMenu] = useState(findMenuNum);
  return (
    <div>
      <section className={styles.logoSection}>
        <Link to="/">
          <img src="../img/goalddaeLogo.png" className={styles.logo} />
        </Link>
      </section>
      <section className={styles.findBtnSection}>
        <Button
          size="large"
          onClick={() => setFindMenu("1")}
          color="success"
          className={styles.findIdBtn}
        >
          아이디 찾기
        </Button>
        <Button
          size="large"
          onClick={() => setFindMenu("2")}
          color="success"
          className={styles.findPwBtn}
        >
          비밀번호 찾기
        </Button>
      </section>
      <section className={styles.mainSession}>
        {findMenu === "1" ? <FindLoginId styles={styles}/> : "비밀번호 찾기화면"}
      </section>
    </div>
  );
};

export default React.memo(FindMain);
