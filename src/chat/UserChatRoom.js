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

const UserChatRoom = ({
  getMessages,
  channelId,
  channelName,
  projectId,
  messageList,
  messagesLen,
  setMessageList,
  setMessagesLen,
  openRoomState,
  setOpenRoomState,
  formatDate,
}) => {
  const messageRef = useRef();
  const userMessageRef = useRef();
  const navigate = useNavigate();

  const ncloudchat = require("ncloudchat");
  const nc = new ncloudchat.Chat();
  nc.initialize(projectId);

  const [message, setMessage] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isPlay = useRef(false);

  //   const [file, setFile] = useState('');

  const onChangeMessage = useCallback((e) => {
    setMessage(e.target.value);
  });

  //   const onChangeFile = useCallback(e => {
  //     setFile(e.target.value);
  //   });

  const list = () => (
    <Box
      sx={{ width: 250, height: 1000 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={styles.drawerMain}
    >
      <List>
        <p className={styles.peopleTitle}>대화상대</p>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <div className={styles.chatOutBtnDiv}>
        <AiOutlineExport className={styles.chatOutBtn} />
      </div>
    </Box>
  );

  // 히든 사이드바 호출/닫기
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  useEffect(() => {
    scrollToBottom();
    startInterval();
  }, [messageList]);

  function startInterval() {
    if (openRoomState) {
      if (!isPlay.current) {
        isPlay.current = true;
        setInterval(() => {
          // 읽지 않은 문자 체크
          const promise = getUnread();
          promise.then((appData) => {
            // 읽지 않은 문자가 있을때 해당 메세지 가져옴
            if (appData.unread > 0) {
              getNewMessages(appData.unread);
            }
          });

          setTimeout(() => (isPlay.current = false), 1000);
        }, 3000);
      }
    }
  }

  // 처음 실행시 스크롤바 맨아래에 오도록 설정
  const scrollToBottom = useCallback(() => {
    if (messagesLen > 0) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  });

  // 텍스트 입력창 글자에 맞게 변하도록 설정
  useEffect(() => {
    if (message !== "") {
      userMessageRef.current.style.height = "auto";
      userMessageRef.current.style.overflow = "auto";
      userMessageRef.current.style.height =
        userMessageRef.current.scrollHeight + "px";
    } else {
      userMessageRef.current.style.overflow = "hidden";
      userMessageRef.current.style.height = "15px";
    }
  }, [message]);

  const getUnread = useCallback(async () => {
    const promise = await nc.countUnread(channelId);
    return promise;
  });

  const getNewMessages = useCallback(async (unread) => {
    const filter = { channel_id: channelId };
    const sort = { created_at: 1 };
    const option = { offset: messagesLen, per_page: unread };

    const messages = await nc.getMessages(filter, sort, option);

    setMessagesLen(messages.totalCount);

    for (const message of messages.edges) {
      let sendDate = formatDate(message);

      await nc.markRead(channelId, {
        user_id: message.node.sender.id,
        message_id: message.node.message_id,
        sort_id: message.node.sort_id,
      });

      if (messageList.length > 0) {
        if (message.node.channel_id === messageList[0].node.channel_id) {
          for (const beforMessage of messageList) {
            if (beforMessage.node.message_id !== message.node.message_id) {
               insertMessageList(sendDate, message);
               break;
            }
          }
        }
      } else {
        insertMessageList(sendDate, message);
      }
    }
  });

  function insertMessageList(sendDate, message) {
    setMessageList((messageList) => [
      ...messageList,
      {
        node: message.node,
        sendDate: sendDate,
      },
    ]);
  }
  // 메세지 전송
  const sendMessage = async () => {
    if (message.trim() !== "") {
      await nc.sendMessage(channelId, {
        type: "text",
        message: message,
      });
      setMessage("");
    }
  };

  // const fileUpload = async () => {
  //     await nc.sendImage(channelId, file);
  // }

  const onkeyPress = (e) => {
    // isComposing: 조합중일시 true
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Enter" && e.shiftKey) {
      return;
    } else if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  return (
    <div className={styles.chatRoomContainer}>
      <AiOutlineArrowLeft
        className={styles.return}
        onClick={() => {
          setOpenRoomState(false);
        }}
      />
      <h2 className={styles.chatRoomName}>{channelName}</h2>
      <AiOutlineMenu
        onClick={toggleDrawer(true)}
        className={styles.openDrawerToggle}
      />
      <div ref={messageRef} className={styles.messagesMainDiv}>
        {messageList.map((message) => (
          <div
            style={
              message.node.sender.id === "asdas"
                ? { textAlign: "right", marginRight: "50px" }
                : { marginLeft: "50px" }
            }
          >
            <span className={styles.senderName}>
              {message.node.sender.name}
            </span>
            <br />
            {message.node.sender.id === "asdas" ? (
              <span className={styles.sendDate}>{message.sendDate}</span>
            ) : (
              ""
            )}
            <div
              className={styles.messageContentDiv}
              style={
                message.node.sender.id === "asdas"
                  ? { background: "#4CC150", color: "white" }
                  : { background: "#E0E0E0" }
              }
            >
              <span className={styles.messageContent}>
                {message.node.content}
              </span>
            </div>

            {message.node.sender.id !== "asdas" ? (
              <span className={styles.sendDate}>{message.sendDate}</span>
            ) : (
              ""
            )}
            <br />
            <br />
          </div>
        ))}
      </div>
      <div className={styles.sendDiv}>
        <div className={styles.inputDiv}>
          <textarea
            id="outlined-required"
            onChange={onChangeMessage}
            value={message}
            color="success"
            className={styles.messageText}
            rows={1}
            ref={userMessageRef}
            onKeyDown={onkeyPress}
          ></textarea>
          <button onClick={sendMessage} className={styles.sendBtn}>
            <AiOutlineArrowUp />
          </button>
        </div>
      </div>
      <Drawer anchor={"right"} open={drawerOpen} onClose={toggleDrawer(false)}>
        {list("right")}
      </Drawer>
      {/* <input type="file" onChange={onChangeFile} value={file}/>
        <button onClick={fileUpload}>사진 전송</button> */}
    </div>
  );
};

export default React.memo(UserChatRoom);
