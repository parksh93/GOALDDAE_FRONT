import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserChatRoom.module.css";
import {
  AiOutlineArrowUp,
  AiOutlineArrowLeft,
  AiOutlineMenu,
  AiOutlineExport,
} from "react-icons/ai";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import Loading from "../loading/Loading";

const UserChatRoom = ({
  setOpenRoomState,
  friend,
  userInfo,
  formatDate,
  channelInfo,
  setOpenLoading,
  openLoading,
  lastMessageList,
  setLastMessageList,
  setChannelInfo
}) => {
  const messageRef = useRef();
  const userMessageRef = useRef();

  const [newMessage, setNewMessage] = useState("");
  const [messageList, setMessgeList] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sendMessageOk, setSendMessageOk] = useState(false);

  useEffect(() => {
    fetch(`/chat/getMessageList/${channelInfo.channelId}`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
      setMessgeList(data);
      setOpenLoading(false);
    })
  }, [channelInfo, openLoading]);

  const sock = new SockJS("http://localhost:8080/chat");
  let client = Stomp.over(sock) ;
  useEffect(() => {
    const sendMessageInfo = {
      userId: userInfo.id,
      content: newMessage,
      sendDate: new Date(),
      channelId: channelInfo.channelId,
      senderName: userInfo.nickname,
      senderProfileImgUrl: userInfo.profileImgUrl
    }
      client.connect({}, () => {
          client.send("/app/chat/join", {}, JSON.stringify(userInfo.id));
          if(sendMessageOk){
            client.send(`/app/chat/${friend.id}`, {}, JSON.stringify(sendMessageInfo));
            // client.send(`/app/chat/${userInfo.id}`, {}, JSON.stringify(sendMessageInfo));
            setMessgeList([...messageList, sendMessageInfo]);
            // setLastMessageList([...lastMessageList, {
            //   id: channelInfo.channelId, 
            //   content: newMessage
            // }]);
            setSendMessageOk(false);
            setNewMessage("");
          }
          
          client.subscribe("/queue/addChatToClient/" + userInfo.id, function(message) {
            const newMessageInfo = JSON.parse(message.body);
            if(newMessageInfo.userId === channelInfo.friendId){
              setMessgeList([...messageList, newMessageInfo]);
            }
            // setLastMessageList([...lastMessageList, {
            //   id: channelInfo.channelId, 
            //   content: newMessageInfo.content
            // }]);
          })
      });
      return () => client.disconnect();
  },[client]);


  const onChangeMessage = useCallback((e) => {
    setNewMessage(e.target.value);
  });

  const sendMessage = useCallback(() => {
    setSendMessageOk(true);
  })

  const list = () => (
    <Box
      sx={{ width: 250, height: 1000 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={styles.drawerMain}
    >
      <div>
        <p className={styles.peopleTitle}>대화상대</p>
      </div>
      <Divider />
      <div className={styles.sideBarMyInfoDiv}>
        <img src={userInfo.profileImgUrl} className={styles.sideBarProfile}/>
        <span className={styles.sideBarNickname}>{userInfo.nickname}</span>
      </div>
      <div className={styles.sideBarFriendInfoDiv}>
        <img src={channelInfo.channelImgUrl} className={styles.sideBarProfile}/>
        <span className={styles.sideBarNickname}>{channelInfo.channelName}</span>
      </div>
      <div className={styles.chatOutBtnDiv}>
        <AiOutlineExport className={styles.chatOutBtn} />
      </div>
    </Box>
  );

  // 히든 사이드바 호출/닫기
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setDrawerOpen(open);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  // 처음 실행시 스크롤바 맨아래에 오도록 설정
  const scrollToBottom = useCallback(() => {
    if (messageList.length > 0) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  });

  // 텍스트 입력창 글자에 맞게 변하도록 설정
  useEffect(() => {
    if (newMessage !== "") {
      userMessageRef.current.style.height = "auto";
      userMessageRef.current.style.overflow = "auto";
      userMessageRef.current.style.height =
      userMessageRef.current.scrollHeight + "px";
    } else {
      userMessageRef.current.style.overflow = "hidden";
      userMessageRef.current.style.height = "15px";
    }
  }, [newMessage]);


  const onkeyPress = (e) => {
    // isComposing: 조합중일시 true
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Enter" && e.shiftKey) {
      return;
    } else if (e.key === "Enter") {
      //메세지 전송 메서드 자리
      sendMessage();
    }
  };

  return (
    <div className={styles.chatRoomContainer}>
      <AiOutlineArrowLeft
        className={styles.return}
        onClick={() => {
          setChannelInfo("");
          setOpenRoomState(false);
        }}
      />
      <h2 className={styles.chatRoomName}>{channelInfo.channelName}</h2>
      <AiOutlineMenu
        onClick={toggleDrawer(true)}
        className={styles.openDrawerToggle}
      />
      {openLoading ? <Loading/> :
      <div ref={messageRef} className={styles.messagesMainDiv}>
        {messageList.map((messageInfo) => (
          <div
            style={
              messageInfo.userId === userInfo.id
                ? { textAlign: "right", marginRight: "50px" }
                : { marginLeft: "50px" }
            }
          >
            {messageInfo.userId !== userInfo.id ?
              <span className={styles.senderName}>
                {messageInfo.senderName}
              </span> 
            : ""
            }
            <br />
            {messageInfo.userId === userInfo.id ? (
              <span className={styles.sendDate}>{formatDate(messageInfo.sendDate)}</span>
              ) : (
                ""
            )}
            <div
              className={styles.messageContentDiv}
              style={
                messageInfo.userId === userInfo.id
                  ? { background: "#4CC150", color: "white" }
                  : { background: "#E0E0E0" }
              }
            >
              <span className={styles.messageContent}>
                {messageInfo.content}
              </span>
            </div>

            {messageInfo.userId !== userInfo.id ? (
              <span className={styles.sendDate}>{formatDate(messageInfo.sendDate)}</span>
              ) : (
                ""
                )}
            <br />
            <br />
          </div>
        ))}
      </div>
        }
      <div className={styles.sendDiv}>
        <div className={styles.inputDiv}>
          <textarea
            id="outlined-required"
            onChange={onChangeMessage}
            value={newMessage}
            color="success"
            className={styles.messageText}
            rows={1}
            ref={userMessageRef}
            onKeyDown={onkeyPress}
          ></textarea>
          <button className={styles.sendBtn} onClick={sendMessage}>
            <AiOutlineArrowUp />
          </button>
        </div>
      </div>
      <Drawer anchor={"right"} open={drawerOpen} onClose={toggleDrawer(false)}>
        {list("right")}
      </Drawer>
    </div>
  );
};

export default React.memo(UserChatRoom);
