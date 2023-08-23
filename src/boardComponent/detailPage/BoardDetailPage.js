import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostDetail from "./PostDetail";
import HeartDetail from "./HeartDetail";
import PostButton from "./PostButton";
import ReplyDetail from "./ReplyDetail";
import { useUser } from "../../userComponent/userContext/UserContext";
import styles from "./detailPage.module.css";

const BoardDetailPage = () => {
  const { id } = useParams();
  const { userInfo } = useUser() || { id: 0, nickname: "Guest" };
  const [boardDetail, setBoardDetail] = useState({});

  useEffect(() => {
    if (userInfo && userInfo.id !== null) {
      console.log(userInfo);
      // 글 상세정보를 가져오는 요청
      axios.get(`/board/detail/${id}`).then((response) => {
        setBoardDetail(response.data);
      });
    }
  }, [id, userInfo]);

  return (
    <div className={styles.container}>
      {userInfo && (
        <>
          <div className={styles.postSection}>
            <PostDetail boardDetail={boardDetail} userInfo={userInfo} />
            <br />
            <HeartDetail boardDetail={boardDetail} userInfo={userInfo} />            
          </div>
          <hr className={styles.separator} />
          <PostButton boardDetail={boardDetail} userInfo={userInfo} />
          <br />
          <ReplyDetail boardDetail={boardDetail} userInfo={userInfo} />
        </>
      )}
    </div>
  );
};

export default BoardDetailPage;
