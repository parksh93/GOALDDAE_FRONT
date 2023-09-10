import UserChatList from "./UserChatList";
import UserChatRoom from "./UserChatRoom";
import styles from "./UserChat.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import Loading from "../loading/Loading";
import {useLocation} from 'react-router-dom'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useUser } from "../userComponent/userContext/UserContext";

const UserChatMain = () => {
  const [channelList, setChannelList] = useState([]);
  const [channelInfo, setChannelInfo] = useState(0);
  const [openRoomState, setOpenRoomState] = useState(false);
  const [openLoading, setOpenLoading] = useState(true);
  const [lastMessageList, setLastMessageList] = useState([]);
  const location = useLocation();
  const {getUserInfo, userInfo} = useUser();
  
  let friend = undefined;
  if(location.state !== null) {
    friend = location.state.friend;
  }
  
  useEffect(() => {
    getUserInfo();
  },[])

  // const sock = new SockJS("http://localhost:8080/chat")
  // let client = Stomp.over(sock) ;
  
  useEffect(() => {
    if(userInfo !== null){
        fetch(`/chat/getChannelList/${userInfo.id}`,{method: "GET"})
        .then(res => res.json())
        .then(data => {
        console.log(data);
        if(data.length !== 0){
          setChannelList(data);
          
          if(friend !== undefined){
            data.map(channel => {
              if(channel.friendId === friend.id){
                setChannelInfo(channel);
              }
            });
            
            setOpenRoomState(true);
          }
        }
      })
    }
  },[userInfo])

  // useEffect(() => {
  //   client.connect({}, () => {
      // console.log("connected : " + userInfo.id)
      // client.send("/app/join", {}, JSON.stringify(userInfo.id))

      // client.send(`/app/chat/${1}`, {}, JSON.stringify())

      // client.subscibe("/queue/addChatToClient/" + userInfo.id, function(messageDTO) {
      //   const message = JSON.parse(messageDTO.body);
      //   console.log(message);
      // })
    // })
  //   return () => client.disconnect();
  // },[client, userInfo.id]);

  // 문자 보낸 시간 초기화
  const formatDate = (sendDate) => {
    const date = new Date();
    const today = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

    let formatSendDate;

    if (
      moment(sendDate, "YYYY-MM-DDTHH:mm:ss").format(
        "YYYY/M/D"
      ) === today
    ) {
      formatSendDate = moment(sendDate, "YYYY-MM-DDTHH:mm:ss").format(
        "오늘 HH시 mm분"
      );
    } else {
      formatSendDate = moment(sendDate, "YYYY-MM-DDTHH:mm:ss").format(
        "YY/MM/DD HH시 mm분"
      );
    }

    return formatSendDate;
  };
  return (
    <div className={styles.chatMainContainer}>
      <div className={styles.chaList}>
        <UserChatList
          channelList={channelList}
          setOpenLoading={setOpenLoading}
          setChannelInfo={setChannelInfo}
          setOpenRoomState={setOpenRoomState}
          channelInfo={channelInfo}
          lastMessageList={lastMessageList}
        />
      </div>
      <div className={styles.chatRoom}>
        {openRoomState === true ? (
          <UserChatRoom
            formatDate={formatDate}
            setOpenRoomState={setOpenRoomState}
            friend={friend}
            userInfo={userInfo}
            channelInfo={channelInfo}
            setOpenLoading={setOpenLoading}
            openLoading={openLoading}
            lastMessageList={lastMessageList}
            setLastMessageList={setLastMessageList}
            setChannelInfo={setChannelInfo}
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
