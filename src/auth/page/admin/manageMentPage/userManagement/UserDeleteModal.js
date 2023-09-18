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

const UserDeleteModal = ({modalOpen, setModalOpen}) => {
    return (
        <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h7" component="h3">
            해당 사용자를 정지하시겠습니까?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            정지시 해당 사용자의 서비스 이용이 제한됩니다.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <button onClick={() => {setModalOpen(false)}} className={styles.modalDeleteBtn}>확인</button>
            <button onClick={() => setModalOpen(false)} className={styles.modalDeleteBtn}>취소</button>
        </Typography>
        </Box>
    </Modal>
    )
}

export default UserDeleteModal;