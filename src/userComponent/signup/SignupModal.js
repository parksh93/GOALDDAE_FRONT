import * as React from "react";
import { useCallback } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 5,
};

function SignupModal({
  modalOpen,
  setModalOpen,
  styles,
  city,
  setCity,
  area,
  setArea,
  activityClass,
  setActivityClass,
  setSignOk
}) {
  const onchangeCity = useCallback((e) => {
    setCity(e.target.value);
  });

  const onChangeArea = useCallback((e) => {
    setArea(e.target.value);
  });

  const onChangeActivityClass = useCallback((e) => {
    setActivityClass(e.target.value);
  });

  const onClick = (e) => {
    if(e.target.value === "no"){
        setCity('');
        setArea('');
        setActivityClass('');
        setSignOk(true);
    }else{
        if(city !== "" && area !== "" && activityClass !== ""){
            setSignOk(true);
        }
    }
  }

  return (
    <div>
      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>선호도시 및 활동 반경 등록</h2>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              color="success"
              className={styles.modalInput}
            >
              선호도시
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="선호도시"
              className={styles.modalInput}
              color="success"
              onChange={onchangeCity}
            >
              <MenuItem value={""}>
                <em>상관없음</em>
              </MenuItem>
              <MenuItem value={"서울"}>서울</MenuItem>
              <MenuItem value={"경기도"}>경기도</MenuItem>
              <MenuItem value={"강원도"}>강원도</MenuItem>
              <MenuItem value={"인천"}>인천</MenuItem>
              <MenuItem value={"충청북도"}>충청북도</MenuItem>
              <MenuItem value={"충청남도"}>충청남도</MenuItem>
              <MenuItem value={"경상북도"}>경상북도</MenuItem>
              <MenuItem value={"경상남도"}>경상남도</MenuItem>
              <MenuItem value={"전라북도"}>전라북도</MenuItem>
              <MenuItem value={"전라남도"}>전라남도</MenuItem>
            </Select>
            <TextField
              label="선호지역"
              variant="outlined"
              type={"text"}
              color="success"
              className={styles.modalInput}
              onChange={onChangeArea}
              value={area}
            />
            <p style={{fontSize:"10px"}}>* 최소 구 단위로 입력해주세요</p>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              className={styles.modalInput}
              color="success"
            >
              활동반경
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="활동반경"
              className={styles.modalInput}
              color="success"
              onChange={onChangeActivityClass}
            >
              <MenuItem value={""}>
                <em>상관없음</em>
              </MenuItem>
              <MenuItem value={10}>10km</MenuItem>
              <MenuItem value={15}>15km</MenuItem>
              <MenuItem value={20}>20km</MenuItem>
              <MenuItem value={25}>25km</MenuItem>
              <MenuItem value={30}>30km</MenuItem>
              <MenuItem value={35}>35km</MenuItem>
              <MenuItem value={40}>40km</MenuItem>
              <MenuItem value={45}>45km</MenuItem>
              <MenuItem value={50}>50km</MenuItem>
            </Select>
          </FormControl>
          <CheckBnt className={styles.modalBtn} onClick={onClick}>등록</CheckBnt>
          <CheckBnt className={styles.modalBtn} onClick={onClick} value="no">건너뛰기</CheckBnt>
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
  margin-top: 20px
`;

export default React.memo(SignupModal);
