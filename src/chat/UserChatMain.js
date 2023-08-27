import UserChatList from "./UserChatList";
import UserChatRoom from "./UserChatRoom";
import styles from "./UserChat.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import { BsFillChatLeftDotsFill } from "react-icons/bs";

const UserChatMain = () => {
  const [projectId, setProjectId] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [messagesLen, setMessagesLen] = useState(0);
  const [channelId, setChannelId] = useState("");
  const [channelName, setChannelName] = useState("");
  const [openRoomState, setOpenRoomState] = useState(false);

  const ncloudchat = require("ncloudchat");
  const nc = new ncloudchat.Chat();
  useEffect(() => {
    connect();
  }, []);

  const connect = async () => {
    await nc.initialize(projectId);
  };

  const openChannelRoom = useCallback(async (channelId, channelName) => {
    setChannelId(channelId);
    setChannelName(channelName);

    console.log("channelId : ", channelId);

    // 처음 메시지 수신
    setMessageList([]);
    const filter = { channel_id: channelId };
    const sort = { created_at: 1 };
    const option = { offset: 0, per_page: 100 };

    getMessages(filter, sort, option, channelId);

    setOpenRoomState(true);
  }, []);

  const getMessages = async (filter, sort, option, channelId) => {
    const messages = await nc.getMessages(filter, sort, option);

    setMessagesLen(messages.totalCount);

    for (const message of messages.edges) {
      let sendDate = formatDate(message);

      await nc.markRead(channelId, {
        user_id: message.node.sender.id,
        message_id: message.node.message_id,
        sort_id: message.node.sort_id,
      });

      setMessageList((messageList) => [
        ...messageList,
        {
          node: message.node,
          sendDate: sendDate,
        },
      ]);
    }
  };

  // 문자 보낸 시간 초기화
  const formatDate = (message) => {
    const date = new Date();
    const today =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    let sendDate;

    if (
      moment(message.node.created_at, "YYYY-MM-DDTHH:mm:ss").format(
        "YYYY/M/D"
      ) === today
    ) {
      sendDate = moment(message.node.created_at, "YYYY-MM-DDTHH:mm:ss").format(
        "오늘 HH시 mm분"
      );
    } else {
      sendDate = moment(message.node.created_at, "YYYY-MM-DDTHH:mm:ss").format(
        "YY/MM/DD HH시 mm분"
      );
    }

    return sendDate;
  };
  return (
    <div className={styles.chatMainContainer}>
      <div className={styles.chaList}>
        <UserChatList
          projectId={projectId}
          openChannelRoom={openChannelRoom}
          setProjectId={setProjectId}
        />
      </div>
      <div className={styles.chatRoom}>
        {openRoomState === true ? (
          <UserChatRoom
            messageList={messageList}
            messagesLen={messagesLen}
            channelId={channelId}
            channelName={channelName}
            setMessagesLen={setMessagesLen}
            setMessageList={setMessageList}
            projectId={projectId}
            getMessages={getMessages}
            setOpenRoomState={setOpenRoomState}
            formatDate={formatDate}
          />
        ) : (
          <div className={styles.outChatRoomDiv}>
            <BsFillChatLeftDotsFill className={styles.icon} />
            <br />
            <span className={styles.outChatRoomMsg}>
              채팅방에 입장해주세요.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChatMain;
