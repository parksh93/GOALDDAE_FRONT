import Modal from "@mui/material/Modal";
import { Box } from "@material-ui/core";
import Payment from "../payment/Payment";
import { useState } from "react";
import styles from "./SoccerField.module.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';

const ReservationModal = ( props ) => {

  const [headCount, setHeadCount] = useState(6);
  const [genderInfo, setGenderInfo] = useState("mixed");

  const handleChange = (event, newGenderInfo) => {
    setGenderInfo(newGenderInfo);
    console.log(newGenderInfo);
  };

  const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      height: 600,
      bgcolor: "background.paper",
      border: "2px solid #444",
      boxShadow: 24,
      p: 5,
    };

    return(

        <Modal
          open={props.isModalOpen}
          onClose={props.closeModal}
        >
          <Box sx={style}>
            <div className={styles.infoText}>{props.fieldInfo.region}</div>
              <div className={styles.infoTitle}>{props.fieldInfo.fieldName}</div>
              <div className={styles.infoText}>
                <span>{props.fieldInfo.fieldSize} / </span>                
                <span>{props.fieldInfo.grassWhether === "1" ? "천연잔디 / " : "인조잔디 / "}</span>                
                <span>{props.fieldInfo.inOutWhether === "1" ? "실내" : "실외"}</span>     
            </div>  
            <hr className={styles.separator}/>
            <div className={styles.modalInfoText}>
              예약 일시
            </div>
            <div>
            {props.selectedDate && props.selectedTime &&
              <TextField
              color="success"
              fullWidth
              id="outlined-read-only-input"
              defaultValue={`${props.selectedDate.year}년 ${props.selectedDate.month}월 ${props.selectedDate.date}일 / ${props.selectedTime}:00 ~ ${props.selectedTime+2}:00 (2시간)`}
              InputProps={{
                readOnly: true,
              }}
              />
            }
            </div>
            {props.selectedDate && props.selectedTime &&
              <div>
              </div>
            }
            <div className={styles.modalInfoText}>
              성별 제한
            </div>

            <ToggleButtonGroup
              color="success"
              value={genderInfo}
              exclusive
              onChange={handleChange}
              aria-label="Gender"
            >
              <ToggleButton value="mixed">혼성</ToggleButton>
              <ToggleButton value="man">남성</ToggleButton>
              <ToggleButton value="woman">여성</ToggleButton>
            </ToggleButtonGroup>          

            <div className={styles.modalInfoText}>
              인원 제한
            </div>

            <TextField
              color="success"
              id="standard-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={headCount}
              onChange={(e) => e.target.value > -1 ? setHeadCount(e.target.value) : setHeadCount(0)}
            />
            <hr className={styles.separator}/>
            <div className={styles.reservationFee}>대관비 {props.fieldInfo.reservationFee}원 결제 및 예약하기</div>
            <Payment
                  fieldId={props.fieldInfo.id}
                  fieldName={props.fieldInfo.fieldName}
                  reservationFee={props.fieldInfo.reservationFee}
                />
          </Box>
        </Modal>

    );

}

export default ReservationModal;