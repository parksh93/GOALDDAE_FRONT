import * as React from "react";
import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Form from "react-bootstrap/Form";

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
  setSignOk,
}) {
  const [availableAreas, setAvailableAreas] = useState([]);
  const seoulAreas = ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구",];
  const gyeonggiAreas = ["가평군","고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","양평군","여주시","연천군","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","하남시","화성시",];
  const incheonAreas = ["강화군","계양구","남동구","동구","미추홀구","부평구","서구","연수구","옹진군","중구"];
  const gangwonAreas = ["춘천시","원주시","강릉시","동해시","태백시","속초시","삼척시","홍천군","횡성군","영월군","평창군","정선군","철원군","화천군","양구군","인제군","고성군","양양군"];
  const daejeonAreas = ["동구", "중구", "서구", "유성구", "대덕구"];
  const chungnamAreas = ["천안시","공주시","보령시","아산시","서산시","논산시","계룡시","당진시","금산군","연기군","부여군","서천군","청양군","홍성군","예산군","태안군"];
  const chungbukAreas = ["청주시","충주시","제천시","보은군","옥천군","영동군","증평군","진천군","괴산군","음성군","단양군",];
  const daeguAreas = ["중구","동구","서구","남구","북구","수성구","달서구","달성군",];
  const gyeongbukAreas = ["포항시","경주시","김천시","안동시","구미시","영주시","영천시","상주시", "문경시","경산시","군위군","의성군","청송군","영양군","영덕군","청도군","고령군","성주군","칠곡군","예천군","봉화군","울진군","울릉군"];
  const busanAreas = ["중구","서구","동구","영도구","부산진구","동래구","남구","북구","해운대구","사하구","금정구","강서구","연제구","수영구","사상구","기장군",];
  const ulsanAreas = ["중구", "남구", "동구", "북구", "울주군"];
  const gyeongnamAreas = ["창원시","진주시","통영시","사천시","김해시","밀양시","거제시","양산시","의령군","함안군","창녕군","고성군","남해군","하동군","산청군","함양군","거창군","합천군",];
  const gwangjuAreas = ["동구", "서구", "남구", "북구", "광산구"];
  const jeonnamAreas = ["목포시","여수시","순천시","나주시","광양시","담양군","곡성군","구례군","고흥군","보성군","화순군","장흥군","강진군","해남군","영암군","무안군","함평군","영광군","장성군","완도군","진도군","신안군",];
  const jeonbukAreas = ["전주시","군산시","익산시","정읍시","남원시","김제시","완주군","진안군","무주군","장수군","임실군","순창군","고창군","부안군",];
  const jejuAreas = ["제주시", "서귀포시"];

  const onchangeCity = useCallback((e) => {
    setArea("");
    setActivityClass(0);
    setCity(e.target.value);
    const preferredCity = e.target.value;
    let availableAreas = [];
    if (preferredCity === "서울") {
      availableAreas = seoulAreas;
    } else if (preferredCity === "경기") {
      availableAreas = gyeonggiAreas;
    } else if (preferredCity === "인천") {
      availableAreas = incheonAreas;
    } else if (preferredCity === "강원") {
      availableAreas = gangwonAreas;
    } else if (preferredCity === "대전") {
      availableAreas = daejeonAreas;
    } else if (preferredCity === "충남") {
      availableAreas = chungnamAreas;
    } else if (preferredCity === "충북") {
      availableAreas = chungbukAreas;
    } else if (preferredCity === "대구") {
      availableAreas = daeguAreas;
    } else if (preferredCity === "경북") {
      availableAreas = gyeongbukAreas;
    } else if (preferredCity === "부산") {
      availableAreas = busanAreas;
    } else if (preferredCity === "울산") {
      availableAreas = ulsanAreas;
    } else if (preferredCity === "경남") {
      availableAreas = gyeongnamAreas;
    } else if (preferredCity === "광주") {
      availableAreas = gwangjuAreas;
    } else if (preferredCity === "전남") {
      availableAreas = jeonnamAreas;
    } else if (preferredCity === "전북") {
      availableAreas = jeonbukAreas;
    } else if (preferredCity === "제주") {
      availableAreas = jejuAreas;
    } else {
      availableAreas = [];
    }
    setAvailableAreas(availableAreas);
  });

  const onChangeArea = useCallback((e) => {
    setActivityClass(0);
    setArea(e.target.value);
  });
  
  const onChangeActivityClass = useCallback((e) => {
      setActivityClass(e.target.value);
  });

  const onClick = (e) => {
    if (e.target.value === "no") {
      setCity("");
      setArea("");
      setActivityClass("");
      setSignOk(true);
    } else {
      if (city !== "" && area !== "") {
        setSignOk(true);
      }
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
          <h3>활동하고 싶은 지역을 선택해보세요!</h3>
          <FormControl fullWidth>
            <b className={styles.modalLabel}>선호도시</b>
            <Select
              className={styles.modalInput}
              color="success"
              onChange={onchangeCity}
            >
              <MenuItem value={""}>선택안함</MenuItem>
              <MenuItem value={"서울"}>서울</MenuItem>
              <MenuItem value={"경기"}>경기</MenuItem>
              <MenuItem value={"인천"}>인천</MenuItem>
              <MenuItem value={"강원"}>강원</MenuItem>
              <MenuItem value={"대전"}>대전</MenuItem>
              <MenuItem value={"충남"}>충남</MenuItem>
              <MenuItem value={"충북"}>충북</MenuItem>
              <MenuItem value={"대구"}>대구</MenuItem>
              <MenuItem value={"경북"}>경북</MenuItem>
              <MenuItem value={"부산"}>부산</MenuItem>
              <MenuItem value={"울산"}>울산</MenuItem>
              <MenuItem value={"경남"}>경남</MenuItem>
              <MenuItem value={"광주"}>광주</MenuItem>
              <MenuItem value={"전남"}>전남</MenuItem>
              <MenuItem value={"전북"}>전북</MenuItem>
              <MenuItem value={"제주"}>제주</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <b className={styles.modalLabel}>선호지역</b>
            <Select
              value={area}
              color="success"
              onChange={onChangeArea}
              className={styles.modalInput}
              style={{ outline: "1px solid #f4f4f4", outlineOffset: "-2px" }}
            >
              <MenuItem value={""}>선택안함</MenuItem>
              {availableAreas.map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Form>
              <Form.Group controlId="formRange">
                <Form.Label>
                  <b className={styles.modalLabel}>활동반경</b>
                  <b className={styles.acivityRang}>{activityClass}km</b>
                </Form.Label>
                <br />
                <Form.Range
                  min="0"
                  max="50"
                  step="5"
                  value={activityClass}
                  onChange={onChangeActivityClass}
                  color="success"
                  disabled={area === "" ? true : false}
                />
              </Form.Group>
            </Form>
          </FormControl>
          <CheckBnt className={styles.modalBtn} onClick={onClick}>
            등록
          </CheckBnt>
          <CheckBnt className={styles.modalBtn} onClick={onClick} value="no">
            건너뛰기
          </CheckBnt>
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

export default React.memo(SignupModal);