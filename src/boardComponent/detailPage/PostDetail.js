import React from "react";
import { formatDate } from '../dateUtils';
import styles from "./detailPage.module.css"; // CSS 모듈 가져오기


const PostDetail = ({boardDetail}) => {

  return (
    <div>
      <div className={styles.postDetailContainer}>
        <h1 className={styles.postTitle}>{boardDetail.title}</h1>
        <div className={styles.postMeta}>
          <p className={styles.author}>{boardDetail.writer}</p>
          <p className={styles.info}>조회수 {boardDetail.count} <br/> {formatDate(boardDetail.writeDate)}</p>
        </div>
      </div>     
      <hr className={styles.separator} />
      <div className={styles.postDetailContainer}>
        {boardDetail.img1 && 
        <div>
          <img src={boardDetail.img1} alt="" className={styles.postImage} />
        </div>
        }
        {boardDetail.img2 && 
        <div>
          <img src={boardDetail.img2} alt="" className={styles.postImage} />
        </div>
        }
        {boardDetail.img3 && 
        <div>
          <img src={boardDetail.img3} alt="" className={styles.postImage} />
        </div>
        }
        {boardDetail.img4 && 
        <div>
          <img src={boardDetail.img4} alt="" className={styles.postImage} />
        </div>
        }
        {boardDetail.img5 && 
        <div>
          <img src={boardDetail.img5} alt="" className={styles.postImage} />
        </div>
        }
        <div className={styles.content}>{boardDetail.content}</div>
      </div>
    </div>
  );
};

export default PostDetail;
