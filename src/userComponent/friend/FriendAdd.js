import {useEffect, useState, useCallback} from 'react'
import styles from "./FriendAdd.module.css";
import {BsCheck2, BsXLg} from 'react-icons/bs'
import * as React from "react";

const FriendAdd = ({
    userInfo, 
    formatDate,
    setOpenAlert,
    setAlertSeverity,
    setAlertText
}) => {
    const [friendList, setFriendList] = useState(null);
    const [waitBtnText, setWaitBtnText] = useState("대기");
    const [noBtnText, setNoBtnText] = useState("거절");

    useEffect(() => {
        if(userInfo !== null){
            fetch("/friend/findFriendAdd", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: userInfo.id
                })
            })
            .then(res => res.json())
            .then(data => {
                setFriendList(data); 
                console.log(data.acceptDate)
            })
            .catch(() => {
                setFriendList(null);
            });
        }
    },[userInfo]);

    const onMouseOverWaitBtn = useCallback(() => {
        setWaitBtnText("취소");
    });

    const onMouseOutWaitBtn = useCallback(() => {
        setWaitBtnText("대기");
    });

    const onMouseOverNoBtn = useCallback(() => {
        setNoBtnText("삭제");
    });

    const onMouseOutNoBtn = useCallback(() => {
        setNoBtnText("거절");
    });

    const onClickDeleteFriendRequest = useCallback((toUser) => {
        deleteFatch(toUser);
        setAlertSeverity("error");
        setAlertText("거절된 친구 요청이 삭제되었습니다.");
        setOpenAlert(true);
        setTimeout(() => {
            setOpenAlert(false);
            window.location.reload();
        }, 1000);
    });

    const onClickCancleFriendRequest = useCallback((toUser) => {
        deleteFatch(toUser);
        setAlertSeverity("success");
        setAlertText("친구 요청이 취소되었습니다.");
        setOpenAlert(true);
        setTimeout(() => {
            setOpenAlert(false);
            window.location.reload();
        }, 1000);
    });

    const deleteFatch = useCallback(async (toUser) => {
        await fetch("/friend/deleteFriendRequest",{
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                fromUser: userInfo.id,
                toUser: toUser
            })
        });
    })
    return (
        <div className={styles.friendAcceptContainer}>
            {friendList === null ? <span className={styles.noFriendList}>보낸 친구 요청이 없습니다</span>
            :
            friendList.map(friend => (
                <div className={styles.contentDiv}>
                    <img src={friend.profileImgUrl} className={styles.profile}/>
                    <span className={styles.nickname}>{friend.nickname}</span>
                    {friend.accept === 3 ? <span className={styles.date}>{formatDate(friend.requestDate)} 신청</span> :
                    friend.accept === 2 ? <span className={styles.date}>{formatDate(friend.acceptDate)} 거절</span> : ""
                    }
                    {friend.accept === 3 ? 
                        <button className={styles.waitBtn} onMouseOver={onMouseOverWaitBtn} onMouseOut={onMouseOutWaitBtn} onClick={() => onClickCancleFriendRequest(friend.id)}>{waitBtnText}</button> : friend.accept === 2 ? 
                        <button className={styles.noBtn} onMouseOver={onMouseOverNoBtn} onMouseOut={onMouseOutNoBtn} onClick={() => onClickDeleteFriendRequest(friend.id)}>{noBtnText}</button> 
                    : ""}
                </div>
            ))
            }
        </div>
    )
}

export default FriendAdd;