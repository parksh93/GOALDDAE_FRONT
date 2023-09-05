import {useEffect, useState, useCallback} from 'react'
import styles from "./FriendAccept.module.css";
import {BsCheck2, BsXLg} from 'react-icons/bs'
import * as React from "react";

const FriendAccept = ({
    userInfo, 
    formatDate,
    setOpenAlert,
    setAlertSeverity,
    setAlertText
}) => {
    const [friendList, setFriendList] = useState(null);

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
    },[userInfo]);

    const onClickFriendRejection = useCallback((fromUserId) => {
        fetch("/friend/friendRejection", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                userId: userInfo.id,
                fromUser: fromUserId
            })
        });
        setAlertSeverity("error");
        setAlertText("친구 신청이 거절되었습니다.");
        setOpenAlert(true);
        setTimeout(()=> {
            setOpenAlert(false);
            window.location.reload();
        }, 1000);
    });

    return (
        <div className={styles.friendAcceptContainer}>
            {friendList === null ? <span className={styles.noFriendList}>받은 친구 요청이 없습니다</span>
            :
            friendList.map(friend => (
                <div className={styles.contentDiv}>
                    <img src={friend.profileImgUrl} className={styles.profile}/>
                    <span className={styles.nickname}>{friend.nickname}</span>
                    <span className={styles.requestDate}>{formatDate(friend.requestDate)} 신청</span>
                    <BsCheck2 className={styles.check}/>
                    <BsXLg className={styles.no} onClick={() => onClickFriendRejection(friend.id)}/>
                </div>
            ))
            }
        </div>
    )
}

export default FriendAccept;