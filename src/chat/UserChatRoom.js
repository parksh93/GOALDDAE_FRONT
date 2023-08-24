import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import styles from "./UserChat.module.css";
import moment from "moment/moment";
import {AiOutlineArrowUp, AiOutlineArrowLeft} from 'react-icons/ai'

const UserChatRoom = () => {
  const messageRef = useRef();
  const userMessageRef = useRef();
const navigate = useNavigate();

  const location = useLocation();
  const { channelId, projectId, channelName } = location.state;

  const ncloudchat = require("ncloudchat");
  const nc = new ncloudchat.Chat();
  nc.initialize(projectId);

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [messagesLen, setMessagesLen] = useState(0);
//   const [file, setFile] = useState('');

  const onChangeMessage = useCallback((e) => {
    setMessage(e.target.value);
  });

//   const onChangeFile = useCallback(e => {
//     setFile(e.target.value);
//   });

  useEffect(() => {
    userMessageRef.current.style.height = 'auto';
    userMessageRef.current.style.height = userMessageRef.current.scrollHeight + 'px';
  }, [message])

  const scrollToBottom = useCallback(() => {
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  });

  const getMessages = (filter, sort, option) => {
    const promise = nc.getMessages(filter, sort, option);

    promise.then(async (messages) => {
      setMessagesLen(messages.totalCount);

      for (const message of messages.edges) {
        let sendDate = formatDate(message);

        await nc.markRead(channelId, {
          user_id: message.node.sender.id,
          message_id: message.node.message_id,
          sort_id: message.node.sort_id,
        });

        setMessageList((messageList) => [...messageList, {
            node: message.node,
            sendDate: sendDate,
          },
        ]);
      }
    });
  }

  useEffect(() => {
    // window.scrollTo(0, 0);

    // 서버 접속
    nc.connect(
      {
        id: "asdas",
        name: "박상현",
        customField: "json",
      },
      [cookie.load("chatToken")]
    );

    // 처음 메시지 수신
    setMessageList([]);
    const filter = { channel_id: channelId };
    const sort = { created_at: 1 };
    const option = { offset: 0, per_page: 100 };

    getMessages(filter, sort, option);

    startInterval();
}, []);

useEffect(() => {
    scrollToBottom();
}, [messageList])


const getUnread = useCallback(async () => {
    const promise = await nc.countUnread(channelId);
    return promise;
});

const getNewMessages = useCallback(async (unread) => {
    const filter = { channel_id: channelId };
    const sort = { created_at: 1 };
    const option = { offset: (messagesLen), per_page: unread };

    getMessages(filter, sort, option);
  });

  // 문자 보낸 시간 초기화
  const formatDate = (message) => {
    const date = new Date();
    const today = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    let sendDate;

    if (moment(message.node.created_at, "YYYY-MM-DDTHH:mm:ss").format("YYYY/M/D") === today) {
        sendDate = moment(message.node.created_at,"YYYY-MM-DDTHH:mm:ss").format("오늘 HH시 mm분");
    } else {
        sendDate = moment(message.node.created_at,"YYYY-MM-DDTHH:mm:ss").format("YY/MM/DD HH시 mm분");
    }

    return sendDate;
  }

  const startInterval = () => {
    //   setInterval(() => {
    //       // 읽지 않은 문자 체크
    //       const promise = getUnread();
          
    //       promise.then((appData) => {
    //           // 읽지 않은 문자가 있을때 해당 메세지 가져옴
    //           if (appData.unread > 0) {
    //               getNewMessages(appData.unread);
    //             }
    //         });
    //     }, 5000);
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
    if (e.nativeEvent.isComposing) { 	   // isComposing: 조합중일시 true
      return;				  
    }

    if (e.key === 'Enter' && e.shiftKey) {
      return;
    } else if (e.key === 'Enter') { 	 
      sendMessage(e);
    }
  };

return (
    <div>
    <AiOutlineArrowLeft className={styles.return} onClick={() => {
        navigate("/userChatList");
    }}/>
    <h2 className={styles.chatRoomName}>{channelName}</h2>
      <div ref={messageRef} className={styles.messagesMainDiv}>
        {messageList.map((message) => (
          <div
            style={
              message.node.sender.id === "asdas"
                ? { textAlign: "right", marginRight: "50px" }
                : { marginLeft: "50px" }
            }
          >
            <span className={styles.senderName}>{message.node.sender.name}</span>
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
                onChange={onChangeMessage} value={message}
                color="success"
                className={styles.messageText}
                rows={1}
                ref={userMessageRef}
                onKeyDown={onkeyPress}
                >
                </textarea>
                <button onClick={sendMessage} className={styles.sendBtn}><AiOutlineArrowUp /></button>
            </div>
        </div>
        {/* <input type="file" onChange={onChangeFile} value={file}/>
        <button onClick={fileUpload}>사진 전송</button> */}
    </div>
  );
};

export default React.memo(UserChatRoom);
