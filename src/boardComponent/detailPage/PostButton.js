import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./detailPage.module.css";

const PostButton = ({ boardDetail, userInfo }) => {

    const [reportReason, setReportReason] = useState("");
    const [isReporting, setIsReporting] = useState(false);

    const handleDelete = () => {
        // 글 삭제 요청 처리
        axios.delete(`/board/${boardDetail.id}`).then(() => {
          // 삭제 완료 후 목록으로 이동
          window.location.href = "/board";
        });
      };

    const handleReport = () => {
        const requestData = {
            boardId: boardDetail.id,
            reporterUserId: userInfo.id,
            reportedUserId: boardDetail.userId, 
            reason: reportReason
          };
        // 글 신고 요청 처리
        axios.post(`/board/report`, requestData).then(() => {
            setIsReporting(false);
        });
      };


  return (
    <div>
      {userInfo.id === boardDetail.userId ? (
        <>
          <Link to={`/board/edit/${boardDetail.id}`}>
            <button className={styles.detailButton}>수정</button>
          </Link>
          <button onClick={handleDelete} className={styles.detailButton}>삭제</button>
        </>
      ) : (
        <>
          {!isReporting ? (
            <button onClick={() => setIsReporting(true)} className={styles.detailButton}>신고</button>
          ) : (
            <div>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              />
              <button onClick={handleReport}>제출</button>
              <button onClick={() => setIsReporting(false)}>취소</button>
            </div>
          )}
        </>
      )}   

      <Link to="/board">
        <button className={styles.detailButton}>목록으로 돌아가기</button>
      </Link>

    </div>
  );
};

export default PostButton;
