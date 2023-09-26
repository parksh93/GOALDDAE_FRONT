import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { CiCircleRemove } from "react-icons/ci";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 350,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 5,
};

function FindSuccessModal({ value, modalOpen, setModalOpen, styles }) {
    const onClickClose = () => {
        setModalOpen(false);
        window.location.reload();
    }

  return (
    <div>
      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.modalMainDiv}>
      
            <CiCircleRemove  className={styles.closeBtn} onClick={onClickClose}/>
            <br />
            <h2>아이디 찾기 완료!</h2>
           
                <div>
                    회원님의 아이디는<br/><br/>
                    <span className={styles.loginId}>{value}</span><br/><br/>
                    입니다.
                </div>
   

              <Link to="/login" className={styles.goLoginBtnLink}>
                <CheckBnt className={styles.goLoginBtn}>
                로그인 하러가기
                </CheckBnt>
              </Link>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
const CheckBnt = styled(Button)`
  top: 10px;
  width: 100%;
  display: block;
  height: 40px;
  border: 2px solid #108b0c;
  color: white;
  background: #108b0c;
  font-size: 16px;
  margin-top: 20px;
`;

export default FindSuccessModal;
