import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { red } from "@mui/material/colors";
import styles from "./detailPage.module.css";

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
    <div
    sx={{
        '& > :not(style)': {
          m: 2,
        },
      }} className={styles.heartSection}>
        {heartInfo && (
            <>
                <span onClick={handleLike}>
                {heartInfo.hearted ? (
                    <Tooltip title="좋아요 취소">
                        <Badge badgeContent={heartInfo.heartCount} color="success" >
                            <IconButton sx={{color : red[700]}} size="large">
                                <FavoriteIcon />
                            </IconButton>                            
                        </Badge>
                    </Tooltip>
                ) 
                : (
                    <Tooltip title="좋아요">
                        <Badge badgeContent={heartInfo.heartCount} color="success">
                            <IconButton size="large">
                                <FavoriteIcon />
                            </IconButton>                            
                        </Badge>
                    </Tooltip>
                    )}
                </span>
            </>            
        )}     
    </div>
  );
};

export default HeartDetail;
