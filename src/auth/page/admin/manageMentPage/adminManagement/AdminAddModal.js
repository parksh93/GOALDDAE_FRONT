import * as React from "react";
import { useCallback, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import FormControl from "@mui/material/FormControl";
import commonStyle from "../ManageMentPage.module.css"
import { TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 5,
};

function AdminAddModal({ modalOpen, setModalOpen, getAdminList}) {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const numberRegEx = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    const emailRegEx =  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    const onChangeValue = (e) => {
        if(e.target.name === "loginId"){
            setLoginId(e.target.value.trim());
        }else if(e.target.name === "password"){
            setPassword(e.target.value.trim());
        }else if(e.target.name === "name"){
            setName(e.target.value.trim());
        }else if(e.target.name === "email"){
            setEmail(e.target.value.trim());
        }else if(e.target.name === "phoneNumber"){
            setPhoneNumber(e.target.value.trim().replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`));
        }
    };

    const onClickSave = () => {
        if(loginId !== "" && password !== "" && phoneNumber !== "" && email !== "" && name !== ""){
            if(emailRegEx.test(email)){
                console.log(phoneNumber)
                if(numberRegEx.test(phoneNumber)){
                    fetch("/admin/saveAdmin", {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            loginId: loginId,
                            password: password,
                            name: name,
                            email: email,
                            phoneNumber: phoneNumber
                        })
                    }).then(() => {
                      getAdminList()
                      setModalOpen(false)
                    });
                }else{
                    setOpenAlert(true);
                    setAlertText("전화번호의 형식이 올바르지 않습니다.");
                    setTimeout(() => setOpenAlert(false), 2000);
                }
            }else{
                setOpenAlert(true);
                setAlertText("이메일형식이 올바르지 않습니다.");
                setTimeout(() => setOpenAlert(false), 2000);
            }
        }else{
            setOpenAlert(true);
            setAlertText("입력되지 않은 값이 있습니다.");
            setTimeout(() => setOpenAlert(false), 2000);
        }
    };

  return (
    <div>
      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Collapse  in={openAlert}>
                <Alert variant="filled" severity="error" sx={{position: "absolute", width: "77%", borderRadius:"30px"}}>
                    {alertText}
                </Alert>
            </Collapse >
          <h3>관리자 추가</h3><br/>
          <FormControl fullWidth>
            <TextField
            label={"아이디"}
            variant="outlined"
            type="text"
            name= "loginId"
            value={loginId}
            className={commonStyle.modalInput}
            onChange={onChangeValue}
            /><br/>
            <TextField
            label={"비밀번호"}
            variant="outlined"
            type="password"
            name= "password"
            value={password}
            className={commonStyle.modalInput}
            onChange={onChangeValue}
            /><br/>
            <TextField
            label={"이름"}
            variant="outlined"
            type="text"
            name= "name"
            value={name}
            className={commonStyle.modalInput}
            onChange={onChangeValue}
            /><br/>
            <TextField
            label={"이메일"}
            variant="outlined"
            name= "email"
            type="text"
            value={email}
            className={commonStyle.modalInput}
            onChange={onChangeValue}
            /><br/>
            <TextField
            label={"전화번호"}
            variant="outlined"
            name= "phoneNumber"
            type="text"
            value={phoneNumber}
            className={commonStyle.modalInput}
            onChange={onChangeValue}
            /><br/>
          </FormControl>
          <div className={commonStyle.modalBtnGroup}>
            <CheckBnt className={commonStyle.modalBtn} onClick={onClickSave}>
                등록
            </CheckBnt>
            <CheckBnt className={commonStyle.modalBtn} onClick={() => setModalOpen(false)}>
                취소
            </CheckBnt>
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
  border: 2px solid black;
  color: white;
  background: black;
  font-size: 16px;
  margin-top: 20px;
`;

export default React.memo(AdminAddModal);