import {useEffect, useState} from 'react'
import styles from "./FriendList.module.css";
import {BsSend, BsPersonSlash} from 'react-icons/bs'
import * as React from "react";

const FriendList = ({userInfo}) => {
    const [friendList, setFriendList] = useState(null);

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
    },[userInfo]);

    return (
        <div className={styles.friendListContainer}>
            {friendList === null ? <span className={styles.noFriendList}>친구 목록이 없습니다</span>
            :
                friendList.map(friend => (
                    <div className={styles.contentDiv}>
                        <img src={friend.profileImgUrl} className={styles.profile}/>
                        <span className={styles.nickname}>{friend.nickname}</span>
                        <BsSend className={styles.chatBtn} />
                        <BsPersonSlash className={styles.blockBtn} />
                    </div>
                ))
            }
        </div>
    )
}

export default FriendList;