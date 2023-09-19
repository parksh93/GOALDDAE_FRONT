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

const ManagerDeleteModal = ({modalOpen, setModalOpen, onClickDeleteManager}) => {
    return (
        <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h7" component="h3">
            해당 매니저를 삭제하시겠습니까?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            삭제시 복구 불가능합니다.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <button onClick={() => {onClickDeleteManager(); setModalOpen(false)}} className={styles.modalDeleteBtn}>확인</button>
            <button onClick={() => setModalOpen(false)} className={styles.modalDeleteBtn}>취소</button>
        </Typography>
        </Box>
    </Modal>
    )
}

export default ManagerDeleteModal;