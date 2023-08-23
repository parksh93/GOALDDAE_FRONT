import React from "react";
import { formatDate } from '../dateUtils';
import styles from "./detailPage.module.css"; // CSS 모듈 가져오기

const PostDetail = ({ boardDetail}) => {
  return (
    <div className={styles.postDetailContainer}>
      <h1 className={styles.postTitle}>{boardDetail.title}</h1>
      <div className={styles.postMeta}>
        <p className={styles.author}>{boardDetail.writer}</p>
        <p className={styles.info}>{boardDetail.count} 조회수 / {formatDate(boardDetail.writeDate)}</p>
      </div>
      <hr className={styles.separator} />
      <img src={boardDetail.img1} alt="이미지" className={styles.postImage} />
      <p className={styles.content}>{boardDetail.content}</p>
    </div>
  );
};

export default PostDetail;
