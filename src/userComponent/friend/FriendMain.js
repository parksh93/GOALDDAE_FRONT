import { useUser } from "../userContext/UserContext";
import FriendList from "./FriendList";
import FriendSearch from "./FriendSearch";
import {useState, useEffect} from 'react'
import styles from './FriendMain.module.css';
import SelectBar from "./SelectBar";

const FriendMain = () => {
    const [state, setState] = useState(1);

    const {getUserInfo, userInfo} = useUser();

    useEffect(() => {
        getUserInfo();
    },[]);

    const onclickSelectBar = (state) => {
        setState(state);
    }

    return(
        <div className={styles.friendMain}>
            <div className={styles.selectBar}>
                <SelectBar onclickSelectBar={onclickSelectBar} state={state}/>
            </div>
            <FriendSearch userInfo={userInfo}/>
            <div className={styles.contentBox}>
                {state === 1 ? <FriendList userInfo={userInfo}/> : ""}
            </div>
        </div>
    );
}

export default FriendMain;