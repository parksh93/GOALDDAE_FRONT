import UserChatList from "./UserChatList";
import UserChatRoom from "./UserChatRoom";
import styles from "./UserChat.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import Loading from "../loading/Loading";
import {useLocation} from 'react-router-dom'

const UserChatMain = () => {
  const [messageList, setMessageList] = useState([]);
  const [messagesLen, setMessagesLen] = useState(0);
  const [openRoomState, setOpenRoomState] = useState(false);
  const [openLoading, setOpenLoading] = useState(true);
  const location = useLocation();

  const {userInfo} = location.state;

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
          setOpenLoading={setOpenLoading}
        />
      </div>
      <div className={styles.chatRoom}>
        {openRoomState === true ? (
          openLoading ? <Loading/> :
          <UserChatRoom
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
