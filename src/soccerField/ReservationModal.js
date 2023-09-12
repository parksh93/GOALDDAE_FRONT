import Modal from "@mui/material/Modal";
import { Box, InputLabel, Select } from "@material-ui/core";
import Payment from "../payment/Payment";
import { useState } from "react";
import styles from "./SoccerField.module.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { FormControl, MenuItem } from "@mui/material";

const ReservationModal = ( props ) => {

  const [headCount, setHeadCount] = useState(6);
  const [genderInfo, setGenderInfo] = useState("mixed");
  const [teamInfo, setTeamInfo] = useState("individual");
  const [level, setLevel] = useState("유망주");

  const [teamId, setTeamId] = useState(-1);

  const handleChange = (event, newGenderInfo) => {
    if(newGenderInfo){
      setGenderInfo(newGenderInfo);
    }
  };

  const handleTeamInfoChange = (event, newTeamInfo) => {
    if(newTeamInfo !== null){
      setTeamInfo(newTeamInfo);
      setTeamId(newTeamInfo === "individual" ? -1 : props.userInfo.teamId);
    }
  }

  const handleReservation = () => {
    const reservationData = {
      reservedDate: props.selectedDate.year*10000+props.selectedDate.month*100+props.selectedDate.date,
      startTime: props.selectedTime,
      totalHours: 2,
      soccerFieldId: props.fieldInfo.id,
      userId: props.userInfo.id,
      playerNumber: headCount,
      gender: genderInfo,
      level: level,
      teamId: teamId,
    };

    axios.post('/reservation/create', reservationData)
      .then((response) => {
        console.log('성공적으로 예약되었습니다:', response.data);
        window.location.href = `/soccer_field/${props.fieldInfo.id}`;
      })
      .catch((error) => {
        console.error('예약 중 에러 발생:', error);
      });
      console.log(reservationData)
  };


  const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      height: 640,
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
            <div className={styles.flexContainer}>
              <div>
                <div className={styles.modalInfoText}>
                  매치 선택
                </div>
                <ToggleButtonGroup
                  color="success"
                  value={teamInfo}
                  exclusive
                  onChange={handleTeamInfoChange}
                  aria-label="Match Type"
                >
                  <ToggleButton value="individual">
                    개인매치
                  </ToggleButton>
                  {props.userInfo && props.userInfo.teamId === -1 ?
                  <ToggleButton value="team" disabled>
                    팀매치
                  </ToggleButton> :
                  <ToggleButton value="team">
                    팀매치
                  </ToggleButton> }
                </ToggleButtonGroup>    
              </div>
              <div className={styles.buttonContainer}></div>
              <div>
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
              </div>           
            </div> 

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

            <div className={styles.modalInfoText}>
              레벨
            </div>

            <TextField
              color="success"
              id="standard-number"
              select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <MenuItem value="유망주">유망주</MenuItem>
              <MenuItem value="세미프로">세미프로</MenuItem>
              <MenuItem value="프로">프로</MenuItem>
              <MenuItem value="월드클래스">월드클래스</MenuItem>
            </TextField>
            <hr className={styles.separator}/>
            <Payment
                  fieldId={props.fieldInfo.id}
                  fieldName={props.fieldInfo.fieldName}
                  reservationFee={props.fieldInfo.reservationFee}
                  handleReservation={handleReservation}
                />
          </Box>
        </Modal>

    );

}

export default ReservationModal;