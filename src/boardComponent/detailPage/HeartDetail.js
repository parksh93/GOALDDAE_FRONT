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
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

const HeartDetail = ({ boardDetail, userInfo }) => {

    const [heartInfo, setHeartInfo] = useState(null);
    const [open, setOpen] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success")

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

        if(userInfo.id === 0){
            return;
        }

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
              setOpen(true);
              setAlertText("클립보드에 주소가 복사되었습니다.");
              setAlertSeverity("info");
              setTimeout(() => {
                setOpen(false);
              },1000)
            } catch (e) {
                setOpen(true);
                setAlertText("복사에 실패했습니다.");
                setAlertSeverity("error");
                setTimeout(() => {
                  setOpen(false);
                },1000)
            }
        };



  return (
    <div className={styles.heartSection}>
        <Collapse in={open}>
            <Alert severity={alertSeverity} sx={{width: "30%", position: "fixed",marginLeft: "15%", zIndex: "999", borderRadius: "30px", top: "0", marginTop: "20px"}}>
                {alertText}
            </Alert>
        </Collapse>
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
                    <ShareIcon sx={{color : grey[850]}} onClick={() => {handleCopyClipBoard(`http://goalddae.shop/board/${boardDetail.id}`)}}/>             
                    </IconButton>                    
                </Tooltip>
            </>            
        )}     
    </div>
  );
};

export default HeartDetail;
