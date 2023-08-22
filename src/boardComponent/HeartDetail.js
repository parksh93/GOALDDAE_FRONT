import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const HeartDetail = ({ boardDetail, userInfo }) => {

    const [heartInfo, setHeartInfo] = useState(null);

    

    useEffect(() => {

        const requestData = { boardId: boardDetail.id, userId: userInfo.id }
        

        // 좋아요 정보를 가져오는 요청
        axios.post(`/board/heart`, requestData)
        .then((response) => {
            setHeartInfo(response.data);
        })
        .catch(() => {
        });

         
        }, [boardDetail, userInfo]);

    const handleLike = () => {

        const requestData = { boardId: boardDetail.id, userId: userInfo.id }
        
        
        if (heartInfo.hearted) {
            // 좋아요 취소 요청 코드
            axios.delete(`/board/heart/delete`, { data: requestData }).then(() => {
            // 좋아요 취소 요청이 완료되면 좋아요 정보 다시 가져오기
            axios.post(`/board/heart`, requestData).then((response) => {
                setHeartInfo(response.data);
            });
            });
        } else {
            // 좋아요 추가 요청 코드
            axios.post(`/board/heart/save`, requestData).then(() => {
            // 좋아요 추가 요청이 완료되면 좋아요 정보 다시 가져오기
            axios.post(`/board/heart`, requestData).then((response) => {
                setHeartInfo(response.data);
            });
            });
        }
        };



  return (
    <div>
        {heartInfo && (
            <div>
                <p>좋아요 수: {heartInfo.heartCount}</p>
                <button onClick={handleLike}>
                {heartInfo.hearted ? "좋아요 취소" : "좋아요"}
                </button>
            </div>            
        )}     
    </div>
  );
};

export default HeartDetail;
