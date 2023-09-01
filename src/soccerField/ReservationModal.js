import Modal from "@mui/material/Modal";
import { Box } from "@material-ui/core";
import Payment from "../payment/Payment";
import { useState } from "react";

const ReservationModal = ( props ) => {

  const [genderInfo, setGenderInfo] = useState("");
  const [headCount, setHeadCount] = useState("");

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return(

        <Modal
          open={props.isModalOpen}
          onClose={props.closeModal}
        >
          <Box sx={style}>
            우웅
            <div>구장명 : {props.fieldInfo.fieldName}</div>
            <div>대관비 : {props.fieldInfo.reservationFee}</div>
            {props.selectedDate &&
              <div>예약일 : {props.selectedDate.year}-{props.selectedDate.month}-{props.selectedDate.date}</div>
            }
            {props.selectedTime &&
              <div>예약시간 : {props.selectedTime}</div>
            }
            <div>성별 정보 : <input type="text" value={genderInfo} onChange={(e) => setGenderInfo(e.target.value)} /></div>
            <div>인원 수 : <input type="text" value={headCount} onChange={(e) => setHeadCount(e.target.value)} /></div>
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