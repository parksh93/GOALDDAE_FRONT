import {useEffect, useState, useCallback} from 'react'
import styles from "./FriendAdd.module.css";
import {BsCheck2, BsXLg} from 'react-icons/bs'
import * as React from "react";

const FriendAdd = ({
    userInfo, 
    formatDate,
    setOpenAlert,
    setAlertSeverity,
    setAlertText,
    socketData,
    sendWebSocket
}) => {
    const [friendList, setFriendList] = useState(null);
    const [waitBtnText, setWaitBtnText] = useState("대기");
    const [noBtnText, setNoBtnText] = useState("거절");
    const [btnClick, setBtnClick] = useState(false);

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
            })
            .catch(() => {
                setFriendList(null);
            });
        }
    },[userInfo, socketData]);

    const onMouseOverWaitBtn = useCallback((friendId) => {
        document.getElementById(`wait${friendId}`).innerText = "취소";
    });

    const onMouseOutWaitBtn = useCallback((friendId) => {
        document.getElementById(`wait${friendId}`).innerText = "대기";
    });

    const onMouseOverNoBtn = useCallback((friendId) => {
        document.getElementById(`no${friendId}`).innerText = "삭제";
    });

    const onMouseOutNoBtn = useCallback((friendId) => {
        document.getElementById(`no${friendId}`).innerText = "거절";
    });

    const onClickDeleteFriendRequest = useCallback((toUser, nickname) => {
        deleteFatch(toUser);
        setAlertSeverity("error");
        setAlertText(<span><b>{nickname}</b> 님의 거절된 신청이 삭제되었습니다.</span>);
        setOpenAlert(true);
        setTimeout(() => {
            setOpenAlert(false);
        }, 1500);
    });

    const onClickCancleFriendRequest = useCallback((toUser, nickname) => {
        deleteFatch(toUser);
        setAlertSeverity("success");
        setAlertText(<span><b>{nickname}</b> 님에게 보낸 친구 신청이 취소되었습니다.</span>);
        setOpenAlert(true);
        setTimeout(() => {
            setOpenAlert(false);
        }, 1500);   
    });

    const deleteFatch = useCallback(async (toUser) => {
        setBtnClick(true);
        if(!btnClick){ 
            await fetch("/friend/deleteFriendRequest",{
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    fromUser: userInfo.id,
                    toUser: toUser
                })
            }).then(() => {
                sendWebSocket(toUser);
                setBtnClick(false);
            });
        }
    })
    return (
        <div className={styles.friendAcceptContainer}>
            {friendList === null || friendList.length === 0 ? <span className={styles.noFriendList}>보낸 친구 요청이 없습니다</span>
            :
            friendList.map(friend => (
                <div className={styles.contentDiv}>
                    <img src={friend.profileImgUrl} className={styles.profile}/>
                    <span className={styles.nickname}>{friend.nickname}</span>
                    <div className={styles.btnDiv}>
                        {friend.accept === 3 ? <span className={styles.date}>{formatDate(friend.requestDate)} 신청</span> :
                        friend.accept === 2 ? <span className={styles.date}>{formatDate(friend.acceptDate)} 거절</span> : ""
                        }
                        {friend.accept === 3 ? 
                            <button className={styles.waitBtn} id={`wait${friend.id}`} onMouseOver={() => onMouseOverWaitBtn(friend.id)} onMouseOut={() => onMouseOutWaitBtn(friend.id)} onClick={() => onClickCancleFriendRequest(friend.id, friend.nickname)}>대기</button> : friend.accept === 2 ? 
                            <button className={styles.noBtn} id={`no${friend.id}`} onMouseOver={() => onMouseOverNoBtn(friend.id)} onMouseOut={() => onMouseOutNoBtn(friend.id)} onClick={() => onClickDeleteFriendRequest(friend.id, friend.nickname)}>거절</button> 
                        : ""}
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default FriendAdd;