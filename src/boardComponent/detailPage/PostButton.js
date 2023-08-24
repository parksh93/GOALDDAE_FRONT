import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./detailPage.module.css";

const PostButton = ({ boardDetail, userInfo }) => {
  const [reportReason] = React.useState("");

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말로 글을 삭제하시겠습니까?");
    if (confirmDelete) {
      // 글 삭제 요청 처리
      axios.delete(`/board/${boardDetail.id}`).then(() => {
        // 삭제 완료 후 목록으로 이동
        window.location.href = "/board";
      });
    }
  };

  const handleReport = () => {
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
      {userInfo.id === boardDetail.userId ? (
        <>
          <Link to={`/board/edit/${boardDetail.id}`}>
            <button className={styles.detailButton}>수정</button>
          </Link>
          <button onClick={handleDelete} className={styles.detailButton}>
            삭제
          </button>
        </>
      ) : (
        <>
          <button onClick={handleReport} className={styles.detailButton}>
            신고
          </button>
        </>
      )}

      <Link to="/board">
        <button className={styles.detailButton}>목록으로 돌아가기</button>
      </Link>
    </div>
  );
};

export default PostButton;
