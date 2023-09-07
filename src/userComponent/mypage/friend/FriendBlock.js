import {useEffect, useState, useCallback} from 'react'
import styles from "./FriendBlock.module.css";
import * as React from "react";

const FriendBlock = ({
    userInfo, 
    formatDate,
    setOpenAlert,
    setAlertSeverity,
    setAlertText,
    socketData,
    sendWebSocket
}) => {
    const [friendList, setFriendList] = useState(null);
    const [btnClick, setBtnClick] = useState(false);

    useEffect(() => {
        if(userInfo !== null){
            fetch(`/friend/findFriendBlockList/${userInfo.id}`, {method: "GET"})
            .then(res => res.json())
            .then(data => {
                setFriendList(data); 
            })
            .catch(() => {
                setFriendList(null);
            });
        }
    },[userInfo, socketData]);

    const onClickUnblockFriend = useCallback((friendId, nickname) => {
        setBtnClick(true);
        if(!btnClick){
            fetch("/friend/unblockFriend",{
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: userInfo.id,
                    friendId: friendId
                })
            }).then(() => {
                sendWebSocket();
            });
            setAlertSeverity("success");
            setAlertText(<span><b>{nickname}</b> 님의 차단이 해제되었습니다.</span>);
            setOpenAlert(true);
            setTimeout(() => {
                setBtnClick(false);
                setOpenAlert(false);
            }, 1500);
        }
    });

    return (
        <div className={styles.friendBlockContainer}>
            {friendList === null || friendList.length === 0 ? <span className={styles.noFriendList}>차단 목록이 없습니다</span>
            :
            friendList.map(friend => (
                <div className={styles.contentDiv}>
                    <img src={friend.profileImgUrl} className={styles.profile}/>
                    <span className={styles.nickname}>{friend.nickname}</span>
                    <span className={styles.date}>{formatDate(friend.blockDate)} 차단</span>
                    <button className={styles.unBlockBtn} onClick={() => onClickUnblockFriend(friend.id, friend.nickname)}>해제</button>
                </div>
            ))
            }
        </div>
    )
}

export default FriendBlock;