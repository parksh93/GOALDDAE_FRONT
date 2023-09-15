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
  const { userInfo} = useUser();
  const [boardDetail, setBoardDetail] = useState({});
  const [user, setUser] = useState([])

  useEffect(() => {
    if (userInfo) {
      setUser({
        id : userInfo.id,
        nickname : userInfo.nickname
      })
    } else {
      setUser({
        id : 0,
        nickname : "guest"
      })
    }

    // 글 상세정보를 가져오는 요청
    axios.get(`/board/detail/${id}`).then((response) => {
      setBoardDetail(response.data);
    });
  }, [id, userInfo]);

  return (
    <div className={styles.container}>
      {user && (
        <>
          <div className={styles.postSection}>
            <PostDetail boardDetail={boardDetail}/>
            <br />
            <HeartDetail boardDetail={boardDetail} userInfo={user}/>            
          </div>
          <hr className={styles.separator} />
          <PostButton boardDetail={boardDetail} userInfo={user}/>
          <br />
          <ReplyDetail boardDetail={boardDetail} userInfo={user}/>
        </>
      )}
    </div>
  );
};

export default BoardDetailPage;
