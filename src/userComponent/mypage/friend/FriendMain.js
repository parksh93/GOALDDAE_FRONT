import { useUser } from "../../userContext/UserContext";
import FriendList from "./FriendList";
import FriendSearch from "./FriendSearch";
import {useState, useEffect, useCallback} from 'react'
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
                                            
    const sock = new SockJS("http://223.130.137.115/friend");
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
            <Collapse in={openAlert} sx={{ width: '100%', marginBottom: "20px",position:"relative", zIndex: "2"}}>
                    <Alert severity={alertSeverity} sx={{position:"relative", zIndex: "2", borderRadius: "20px"}}>
                        {alertText}
                    </Alert>
            </Collapse>
            <div className={styles.selectBar}>
                <SelectBar 
                    onclickSelectBar={onclickSelectBar} 
                    state={state}
                />
            </div>
            <FriendSearch 
                userInfo={userInfo}
                setOpenAlert={setOpenAlert}
                setAlertSeverity={setAlertSeverity}
                setAlertText={setAlertText}
                socketData={socketData}
                sendWebSocket={sendWebSocket}
                client={client}
            />
            <div className={styles.contentBox}>
                {state === 1 ? <FriendList 
                                    userInfo={userInfo}
                                    setOpenAlert={setOpenAlert}
                                    setAlertSeverity={setAlertSeverity}
                                    setAlertText={setAlertText}
                                    socketData={socketData}
                                    sendWebSocket={sendWebSocket}
                                /> 
                : state === 2 ? <FriendAdd  
                                    userInfo={userInfo} 
                                    formatDate={formatDate}
                                    setOpenAlert={setOpenAlert}
                                    setAlertSeverity={setAlertSeverity}
                                    setAlertText={setAlertText}
                                    socketData={socketData}
                                    sendWebSocket={sendWebSocket}
                                /> 
                : state === 3 ? <FriendAccept 
                                    userInfo={userInfo} 
                                    formatDate={formatDate}
                                    setOpenAlert={setOpenAlert}
                                    setAlertSeverity={setAlertSeverity}
                                    setAlertText={setAlertText}
                                    socketData={socketData}
                                    sendWebSocket={sendWebSocket}
                                /> 
                : <FriendBlock 
                    userInfo={userInfo} 
                    formatDate={formatDate}
                    setOpenAlert={setOpenAlert}
                    setAlertSeverity={setAlertSeverity}
                    setAlertText={setAlertText}
                    socketData={socketData}
                    sendWebSocket={sendWebSocket}
                />}
            </div>
        </div>
    );
}

export default FriendMain;