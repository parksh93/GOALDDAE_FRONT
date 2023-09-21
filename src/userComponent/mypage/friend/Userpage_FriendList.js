import {useEffect, useState, useCallback} from 'react'
import styles from "./FriendList.module.css";
import {BsSend, BsPersonSlash, BsPersonDash} from 'react-icons/bs'
import * as React from "react";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import { useUser } from '../../userContext/UserContext';

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
    userId, 
    // setOpenAlert, 
    // setAlertSeverity, 
    // setAlertText,
    // socketData,
    // sendWebSocket,
}) => {
    const [friendList, setFriendList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [btnClick, setBtnClick] = useState(false);
    const [friendNickname, setFriendNickname] = useState("");
    const [friendId, setFriendId] = useState(0);
    const navigate = useNavigate();
    const user = useUser(); 

    useEffect(() => {
            fetch("/friend/findFriendList", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: userId
                })
            })
            .then(res => res.json())
            .then(data => {
                setFriendList(data);
            });
    },[]);


    return (
        <div className={styles.friendListContainer}>
            {friendList.length === 0 ? <span className={styles.noFriendList}>친구 목록이 없습니다</span>
            :
                friendList.map(friend => (
                    <div className={styles.contentDiv} style={{ marginTop: '10px' }}>
                        <img src={friend.profileImgUrl} className={styles.profile}/>
                        <span 
                            className={styles.nickname}
                            onClick={() => {
                                  navigate(`/myPage/${friend.id}`);
                                  window.location.reload();
                            }}
                            style={{ cursor: 'pointer' }} 
                        >
                            {friend.nickname}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}

export default FriendList;