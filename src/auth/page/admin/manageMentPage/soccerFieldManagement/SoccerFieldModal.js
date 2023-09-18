import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import styles from "../ManageMentPage.module.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px"
  };

const SoccerFieldModal = ({modalOpen, setModalOpen, deleteSoccerField}) => {
    return (
        <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h7" component="h3">
            해당 구장을 삭제하시겠습니까?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            삭제시 복구되지 않습니다.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <button onClick={() => {
                deleteSoccerField()
                setModalOpen(false);
            }} className={styles.modalDeleteBtn}>확인</button>
            <button onClick={() => setModalOpen(false)} className={styles.modalDeleteBtn}>취소</button>
        </Typography>
        </Box>
    </Modal>
    )
}

export default SoccerFieldModal;