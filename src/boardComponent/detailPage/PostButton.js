import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./detailPage.module.css";
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';

const PostButton = ({ boardDetail, userInfo }) => {
  const [reportReason] = React.useState("");

  const handleDelete = () => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      // 글 삭제 요청 처리
      axios.delete(`/board/${boardDetail.id}`).then(() => {
        // 삭제 완료 후 목록으로 이동
        window.location.href = "/board";
      });
    }
  };

  const handleReport = () => {

    if(userInfo.id === 0){
      return;
    }

    const reason = window.prompt("신고 사유를 입력하세요:", reportReason);
    if (reason !== null) {
      const requestData = {
        boardId: boardDetail.id,
        reporterUserId: userInfo.id,
        reportedUserId: boardDetail.userId,
        reason: reason,
      };
      // 글 신고 요청 처리
      axios.post(`/board/report`, requestData).then(() => {
        // 처리 후 작업 수행
      });
    }
  };

  return (
    <div>
      <Link to="/board">
      <Button variant="contained" color="success" className={styles.detailButton} sx={{margin : "3px", padding : "5px 10px"}} startIcon={<MenuIcon />}>
        <span className={styles.detailText}>목록으로 돌아가기</span>
      </Button>
      </Link>
      {userInfo.id === boardDetail.userId ? (
        <>
          <Button onClick={handleDelete} variant="contained" color="success" className={styles.detailButton} sx={{margin : "3px", padding : "5px 10px"}} startIcon={<DeleteIcon />}>
            <span className={styles.detailText}>삭제</span>
          </Button>
          <Link to={`/board/edit/${boardDetail.id}`}>
            <Button variant="contained" color="success" className={styles.detailButton} sx={{margin : "3px", padding : "5px 10px"}} startIcon={<EditIcon />}>
              <span className={styles.detailText}>수정</span>
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Button onClick={handleReport} variant="contained" color="success" className={styles.detailButton} sx={{margin : "3px", padding : "5px 10px"}} startIcon={<ReportIcon />}>
            <span className={styles.detailText}>신고</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default PostButton;
