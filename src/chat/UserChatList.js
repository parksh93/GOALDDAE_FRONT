import React, { useEffect, useState, useCallback, useRef } from "react";
import cookie from "react-cookies";
import styles from "./UserChatList.module.css";
import { CiChat1 } from "react-icons/ci";
import { BiUser, BiGroup } from "react-icons/bi";

const UserChat = ({openChannelRoom, setProjectId, setOpenLoading}) => {
  const ncloudchat = require("ncloudchat");
  const [myChannelList, setMyChannelList] = useState([]);
  const [chatType, setChatType] = useState(0);
  const listRef = useRef(false);

  const nc = new ncloudchat.Chat();

  useEffect(() => {
      //token 가져오기
    fetch("/getChatProperties", { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        setProjectId(data.projectId);
        nc.initialize(data.projectId);
        fetch("https://dashboard-api.ncloudchat.naverncp.com/v1/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": data.apiKey,
            "x-project-id": data.projectId,
          },
          body: JSON.stringify({
            id: "asdas",
            expireDay: 1,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 1) {
              cookie.save("chatToken", data.token, {
                path: "/",
              });
            }
          });

        // 서버 접속
        nc.connect(
          {
            id: "asdas",
            name: "박상현",
            customField: "json",
          },
          [cookie.load("chatToken")]
        );
        // 채널 정보 가져옴
        setMyChannelList([]);
        getChannelList();
      });
    }, []);
    
  setInterval(() => {
    if(!listRef.current){
        listRef.current = true;
        setMyChannelList([]);
        getChannelList();
        setTimeout(() => listRef.current = false, 5000)
    }
  },5000);

  const selectChat = () => {
    if(chatType === 0){
      setChatType(1);
    }else{
      setChatType(0);
    }
  }
  const createChannel = useCallback(async () => {
    // 채팅 생성
    const channel = await nc.createChannel({
      type: "PUBLIC",
      name: "유정원",
    });

    // 채팅 참여
    await nc.subscribe(channel.id);
  });

  // 채팅 리스트 가져오기
  const getChannelList = async () => {
    const filter = { state: true };
    const sort = { create_at: -1 };
    const channels = await nc.getChannels(filter, sort); // 전체 채널 리스트 가져오기

    for (const channelList of channels.edges) {
        const filter = { channel_id: channelList.node.id };
        const sort = { updated_at: 1 };
        const option = { offset: 0, per_page: 100 };
        const subscriptions = await nc.getSubscriptions(filter, sort, option); // 각 채널들의 참여자 가져오기
        
      let channelLastContent;
      if (channelList.node.last_message === null) {
        channelLastContent = "";
      } else {
          channelLastContent = channelList.node.last_message.content;
          if (channelLastContent.length > 20) {
              const subContent = channelLastContent.substring(0, 20);
              channelLastContent = subContent + "...";
            }
      }

      if (subscriptions.totalCount > 0) {
        for (const channelInfo of subscriptions.edges) {
          if (channelInfo.node.user.id === "asdas") {
            // 읽지 않은 문자 체크
            const promise = nc.countUnread(channelInfo.node.channel_id);
            promise.then((appData) => {
                setMyChannelList((myChannelList) => [
                  ...myChannelList,
                  {
                    channelInfo: channelInfo,
                    lastContent: channelLastContent,
                    unReadCnt: appData.unread,
                  },
                ]);
            });
          }
        }
      }
    }
    
  };

  // // 접속 종료
  // const disconnectChannel = useCallback(async () => {
  //   await nc.disconnect();
  // });

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
        {myChannelList.length === 0 ? (
          <div>
            <span>채팅 목록이 없습니다.</span>
            <br />
          </div>
        ) : (
          myChannelList.map((myChannel) => (
            <div
              onClick={async () => {
                setOpenLoading(true);
                openChannelRoom(myChannel.channelInfo.node.channel_id, myChannel.channelInfo.node.channel.name);
              }
            }
              className={styles.channelDiv}
            >
              <div className={styles.profileImgDiv}>
                <img
                  src="./img/userProfileImg/goalddae_default_profile.Webp"
                  className={styles.profileImg}
                />
              </div>
              <div>
                <span className={styles.channelName}>
                  {myChannel.channelInfo.node.channel.name}
                </span>
                <br />
                <span className={styles.lastContent}>
                  {myChannel.lastContent}
                </span>
                <span
                  className={styles.unReadCnt}
                  style={
                    myChannel.unReadCnt > 0
                      ? { background: "#FF5656", color: "white" }
                      : {}
                  }
                >
                  {myChannel.unReadCnt > 0 ? myChannel.unReadCnt : ""}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.channelListFooter}>
        <img src="./img/chatMainFooter2.Webp" className={styles.footerImg} />
      </div>
      {/* <button onClick={createChannel}>생성</button> */}
    </div>
  );
};

export default React.memo(UserChat);
