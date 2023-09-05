import { useUser } from "../userContext/UserContext";
import FriendList from "./FriendList";
import FriendSearch from "./FriendSearch";
import {useState, useEffect} from 'react'
import styles from './FriendMain.module.css';
import SelectBar from "./SelectBar";
import FriendAccept from "./FriendAccept";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import FriendAdd from "./FriendAdd";

const FriendMain = () => {
    const [state, setState] = useState(1);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("success");
    const {getUserInfo, userInfo} = useUser();

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
            <Collapse in={openAlert} sx={{ width: '400px', marginLeft: "100px", position:"fixed", zIndex: "2"}}>
                    <Alert variant="filled" severity={alertSeverity} sx={{position:"relative", zIndex: "2", mb: 2, borderRadius: "20px", color:"white"}}>
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
            />
            <div className={styles.contentBox}>
                {state === 1 ? <FriendList userInfo={userInfo}/> 
                : state === 2 ? <FriendAdd  
                                    userInfo={userInfo} 
                                    formatDate={formatDate}
                                    setOpenAlert={setOpenAlert}
                                    setAlertSeverity={setAlertSeverity}
                                    setAlertText={setAlertText}
                                /> 
                : state === 3 ? <FriendAccept 
                                    userInfo={userInfo} 
                                    formatDate={formatDate}
                                    setOpenAlert={setOpenAlert}
                                    setAlertSeverity={setAlertSeverity}
                                    setAlertText={setAlertText}
                                /> 
                : ""}
            </div>
        </div>
    );
}

export default FriendMain;