import {useEffect, useState, useCallback} from 'react'
import styles from "./FriendAccept.module.css";
import {BsCheck2, BsXLg} from 'react-icons/bs'
import * as React from "react";

const FriendAccept = ({
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
            fetch("/friend/findFriendAccept", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: userInfo.id
                })
            })
            .then(res => res.json())
            .then(data => {
                setFriendList(data); 
            })
            .catch(() => {
                setFriendList(null);
            });
        }
    },[userInfo, socketData]);

    const onClickFriendRejection = useCallback((fromUserId, nickname) => {
        setBtnClick(true);
        if(!btnClick){
            fetch("/friend/friendRejection", {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: userInfo.id,
                    fromUser: fromUserId
                })
            }).then(() => {
                sendWebSocket();
            });

            setAlertSeverity("error");
            setAlertText(<span><b>{nickname}</b> 님의 친구 요청이 거절되었습니다.</span>);
            setOpenAlert(true);
            setTimeout(()=> {
                setOpenAlert(false);
                setBtnClick(false);
            }, 1500);
        }

    });

    const onClickAcceptFriend = useCallback((fromUserId, nickname) => {
        setBtnClick(true);
        if(!btnClick){
            fetch("/friend/addFriend", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    toUser: userInfo.id,
                    fromUser: fromUserId
                })
            }).then(() => {
                sendWebSocket();
            });
            setAlertSeverity("success");
            setAlertText(<span><b>{nickname}</b> 님의 친구 요청이 수락되었습니다.</span>);
            setOpenAlert(true);
            setTimeout(()=> {
                setBtnClick(false);
                setOpenAlert(false);
            }, 1500);
        }
        
    });

    return (
        <div className={styles.friendAcceptContainer}>
            {friendList === null || friendList.length === 0 ? <span className={styles.noFriendList}>받은 친구 요청이 없습니다</span>
            :
            friendList.map(friend => (
                <div className={styles.contentDiv}>
                    <img src={friend.profileImgUrl} className={styles.profile}/>
                    <span className={styles.nickname}>{friend.nickname}</span>
                    <span className={styles.requestDate}>{formatDate(friend.requestDate)} 신청</span>
                    <BsCheck2 className={styles.check} onClick={() => onClickAcceptFriend(friend.id, friend.nickname)}/>
                    <BsXLg className={styles.no} onClick={() => onClickFriendRejection(friend.id, friend.nickname)}/>
                </div>
            ))
            }
        </div>
    )
}

export default FriendAccept;