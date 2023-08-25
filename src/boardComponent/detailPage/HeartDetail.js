import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { grey, red } from "@mui/material/colors";
import styles from "./detailPage.module.css";
import ShareIcon from '@mui/icons-material/Share';

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

        const handleCopyClipBoard = async (text) => {
            try {
              await navigator.clipboard.writeText(text);
              alert('클립보드에 링크가 복사되었습니다.');
            } catch (e) {
              alert('복사에 실패하였습니다');
            }
        };



  return (
    <div className={styles.heartSection}>
        {heartInfo && (
            <>
                <span onClick={handleLike}>
                {heartInfo.hearted ? (
                    <Tooltip title="좋아요 취소">
                        <Badge badgeContent={heartInfo.heartCount} color="success" className={styles.badge}>
                            <IconButton sx={{color : red[700], margin : "-5px"}} size="large" className={styles.heartIcon}>
                                <FavoriteIcon />
                            </IconButton>                            
                        </Badge>
                    </Tooltip>
                ) 
                : (
                    <Tooltip title="좋아요">
                        <Badge badgeContent={heartInfo.heartCount} color="success" className={styles.badge}>
                            <IconButton sx={{margin : "-5px"}} size="large" className={styles.heartIcon}>
                                <FavoriteIcon />
                            </IconButton>                            
                        </Badge>
                    </Tooltip>
                    )}
                </span>
                <Tooltip title="공유하기">
                    <IconButton sx={{marginLeft : "20px"}} size="large"  className={styles.shareIcon}>
                    <ShareIcon sx={{color : grey[850]}} onClick={() => {handleCopyClipBoard(`/board/${boardDetail.id}`)}}/>             
                    </IconButton>                    
                </Tooltip>
            </>            
        )}     
    </div>
  );
};

export default HeartDetail;
