import {useEffect, useState, useCallback} from 'react'
import styles from "./FriendList.module.css";
import {BsSend, BsPersonSlash, BsPersonDash} from 'react-icons/bs'
import * as React from "react";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px"
  };


const FriendList = ({
    userInfo, 
    setOpenAlert, 
    setAlertSeverity, 
    setAlertText,
    socketData,
    sendWebSocket,
}) => {
    const [friendList, setFriendList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [btnClick, setBtnClick] = useState(false);
    const [friendNickname, setFriendNickname] = useState("");
    const [friendId, setFriendId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(userInfo !== null){
            fetch("/friend/findFriendList", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: userInfo.id
                })
            })
            .then(res => res.json())
            .then(data => {
                setFriendList(data);
            });
        }
    },[userInfo, socketData]);

    const onClickDeleteFriend = useCallback((friendId, nickname) => {
        setBtnClick(true);
        if(!btnClick){
            fetch("/friend/deleteFriend", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: userInfo.id,
                    friendId: friendId
                })
            }).then(() => {
                sendWebSocket(friendId);
                setBtnClick(false);
            });
            setAlertSeverity("error");
            setAlertText(<span><b>{nickname}</b> 님이 친구 목록에서 삭제되었습니다.</span>);
            setOpenAlert(true);
            setTimeout(() => {
                setOpenAlert(false);
            }, 1500);
        }
    });

    const onClickBlockFriend = useCallback((friendId, nickname) => {
        setBtnClick(true);
        if(!btnClick){
            fetch("/friend/blockFriend",{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: userInfo.id,
                    friendId: friendId
               })
            }).then(() => {
                sendWebSocket(friendId);
                setBtnClick(false);
            });
            setModalOpen(false);
            setAlertSeverity("error");
            setAlertText(<span><b>{nickname}</b> 님이 차단되었습니다.</span>);
            setOpenAlert(true);
            setTimeout(() => {
                setOpenAlert(false);
            }, 1500);
        }
    });

    const blockModal = useCallback((friendId, friendNickname) => {
        setFriendId(friendId);
        setFriendNickname(friendNickname);
        setModalOpen(true);
    });

    return (
        <div className={styles.friendListContainer}>
            {friendList.length === 0 ? <span className={styles.noFriendList}>친구 목록이 없습니다</span>
            :
                friendList.map(friend => (
                    <div className={styles.contentDiv}>
                        <img src={friend.profileImgUrl} className={styles.profile}/>
                        <span 
                            className={styles.nickname}
                            onClick={() => {
                                // 해당 사람의 페이지로 이동하기
                                navigate(`/myPage/${friend.id}`);
                                window.location.reload();
                            }}
                            style={{ cursor: 'pointer' }} 
                        >
                            {friend.nickname}
                        </span>
                        <div className={styles.btnDiv}>
                            <BsSend className={styles.chatBtn} 
                                    onClick={() => 
                                        navigate("/userChat", 
                                            {state: {
                                                    userInfo: userInfo,
                                                    friend: friend,
                                                }
                                            }
                                        )
                            }/>
                    
                            <BsPersonDash className={styles.deleteBtn} onClick={() => onClickDeleteFriend(friend.id, friend.nickname)}/>
                            <BsPersonSlash className={styles.blockBtn} onClick={() => blockModal(friend.id, friend.nickname)}/>
                        </div>
                    </div>
                ))
            }
            <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <b>{friendNickname}</b>님을 차단하시겠습니까?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        차단시 더이상 검색에서 해당 사용자가 표시되지 않으며, 채팅이 불가합니다.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <button onClick={() => onClickBlockFriend(friendId, friendNickname)} className={styles.blockOkBtn}>확인</button>
                        <button onClick={() => setModalOpen(false)} className={styles.blockNoBtn}>취소</button>
                    </Typography>
                    </Box>
                </Modal>
        </div>
    )
}

export default FriendList;