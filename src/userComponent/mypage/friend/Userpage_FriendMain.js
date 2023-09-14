import { useUser } from "../../userContext/UserContext";
import FriendList from "../FriendList";
import FriendSearch from "./FriendSearch";
import {useState, useEffect, useRef, useCallback} from 'react'
import styles from './FriendMain.module.css';
import SelectBar from "./SelectBar";
import FriendAccept from "./FriendAccept";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import FriendAdd from "./FriendAdd";
import FriendBlock from "./FriendBlock";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const FriendMain = () => {
    const [state, setState] = useState(1);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("success");
    const {getUserInfo, userInfo} = useUser();    
    const [friendId, setFriendId] = useState(0);

    const [socketData, setSocketData] = useState();
    //const ws = useRef(null);    //webSocket을 담는 변수, 
                                //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

                                
                                // const webSocketLogin = useCallback(() => {
                                    // ws.current = new WebSocket("ws://localhost:8080/socket/friend");
                                    
                                    // ws.current.onmessage = (message) => {
                                        //     const dataSet = JSON.parse(message.data);
                                        //     setSocketData(dataSet);
                                        // }
                                        // client.connect({}, () => {
                                            //     client.send("/app/friend/join", {}, JSON.stringify(userInfo.id))
                                            // })
                                            // }); 
                                            
    const sock = new SockJS("http://localhost:8080/friend");
    let client = Stomp.over(sock) ;
    useEffect(() => {
        const temp = JSON.stringify(new Date().toLocaleString());
        client.connect({}, () => {
            client.send("/app/friend/join", {}, JSON.stringify(userInfo.id))
            
            client.send(`/app/friend/${friendId}`, {}, JSON.stringify(temp))
            client.send(`/app/friend/${userInfo.id}`, {}, JSON.stringify(temp))
            
            client.subscribe("/queue/FriendRequestToClient/" + userInfo.id, function(message) {
                setSocketData(message);
            })
        })  
        return () => client.disconnect();

    },[client]);
        
    const sendWebSocket = useCallback((friendId) => {
        setFriendId(friendId)
        // if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
        //                                     // 0은 연결되어 있지 않은 상태
        //     ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
        //         ws.current.send(temp);
        //     }
        // }else {
        //     ws.current.send(temp);
        // }
        
        // ws.current.onmessage = (message) => {
            //     const dataSet = JSON.parse(message.data);
            //     setSocketData(dataSet);
            // )
    });
    
    useEffect(() => {
        getUserInfo();
    },[]);

    const onclickSelectBar = (state) => {
        setState(state);
    }

    function formatDate(datetime) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric'};
        const formattedDate = new Date(datetime).toLocaleString('ko-KR', options);
    
    return formattedDate;
    }

    return(
        <div className={styles.friendMain}>
        <Collapse in={openAlert} sx={{ width: '100%', marginBottom: "20px", position: "relative", zIndex: "2" }}>
          <Alert severity={alertSeverity} sx={{ position: "relative", zIndex: "2", borderRadius: "20px" }}>
            {alertText}
          </Alert>
        </Collapse>
        <div className={styles.selectBar}>
          <SelectBar
            onclickSelectBar={onclickSelectBar}
            state={state}
          />
        </div>
        {state === 1 && (
          <FriendSearch
            userInfo={userInfo}
            setOpenAlert={setOpenAlert}
            setAlertSeverity={setAlertSeverity}
            setAlertText={setAlertText}
            socketData={socketData}
            sendWebSocket={sendWebSocket}
            client={client}
          />
        )}
        <div className={styles.contentBox}>
          {state === 1 && (
            <FriendList
              userInfo={userInfo}
              setOpenAlert={setOpenAlert}
              setAlertSeverity={setAlertSeverity}
              setAlertText={setAlertText}
              socketData={socketData}
              sendWebSocket={sendWebSocket}
            />
          )}
        </div>
      </div>
      
    );
}

export default FriendMain;