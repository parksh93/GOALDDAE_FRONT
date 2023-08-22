import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import { useUser } from "../userComponent/userContext/UserContext";
import PostDetail from "./PostDetail";
import HeartDetail from "./HeartDetail";
import PostButton from "./PostButton";
import ReplyDetail from "./ReplyDetail";

const BoardDetailPage = () => {

  const { id } = useParams();

  const { userInfo } = useUser() || { id: 0, nickname: "Guest" };

  const [boardDetail, setBoardDetail] = useState({});


  useEffect(() => {

    if (userInfo && userInfo.id !== null) {
      console.log(userInfo)
      // 글 상세정보를 가져오는 요청
      axios.get(`/board/detail/${id}`).then((response) => {
        setBoardDetail(response.data);
      });
    }

  }, [id, userInfo]);

  return (
    <div>


      {userInfo &&
      <>
      <PostDetail boardDetail={boardDetail} userInfo={userInfo}/>
      <HeartDetail boardDetail={boardDetail} userInfo={userInfo}/>
      <PostButton boardDetail={boardDetail} userInfo={userInfo}/>
      <ReplyDetail boardDetail={boardDetail} userInfo={userInfo}/>
      </>       
        }
    </div>
  );
};

export default BoardDetailPage;
