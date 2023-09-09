import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./UserChatList.module.css";
import { CiChat1 } from "react-icons/ci";
import { BiUser, BiGroup } from "react-icons/bi";

const UserChatList = ({channelList, setOpenLoading}) => {
  // const [myChannelList, setMyChannelList] = useState([]);
  const [chatType, setChatType] = useState(0);

  const selectChat = () => {
    if(chatType === 0){
      setChatType(1);
    }else{
      setChatType(0);
    }
  }

  return (
    <div className={styles.chatListContainer}>
      <div className={styles.chatListTitleDiv}>
        <h2 className={styles.chatListTitle}>
          채팅
          <CiChat1 />
        </h2>
        <div className={styles.selectChatDiv}>
          <span className={styles.selectChat} style={chatType === 0 ? {color: "black"} : {color: "lightgray"}} onClick={selectChat}>개인<BiUser onClick={selectChat}/></span>
          <span className={styles.selectChat} style={chatType === 1 ? {color: "black"} : {color: "lightgray"}} onClick={selectChat}>팀<BiGroup onClick={selectChat}/></span>
        </div>
      </div>
      <div className={styles.chatListMain}>
        {channelList.length === 0 ? (
          <div>
            <span>채팅 목록이 없습니다.</span>
            <br />
          </div>
        ) : (
          channelList.map((channel) => (
            <div
              onClick={async () => {
                setOpenLoading(true);
              }
            }
              className={styles.channelDiv}
            >
              <div className={styles.profileImgDiv}>
                <img
                  src={channel.channelImgUrl}
                  className={styles.profileImg}
                />
              </div>
              <div>
                <span className={styles.channelName}>
                  {channel.channelName}
                </span>
                <br />
                <span className={styles.lastContent}>
                  
                </span>
                {/* <span
                  className={styles.unReadCnt}
                  style={
                    myChannel.unReadCnt > 0
                      ? { background: "#FF5656", color: "white" }
                      : {}
                  }
                >
                  {myChannel.unReadCnt > 0 ? myChannel.unReadCnt : ""}
                </span> */}
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.channelListFooter}>
        <img src="./img/chatMainFooter2.Webp" className={styles.footerImg} />
      </div>
    </div>
  );
};

export default React.memo(UserChatList);
