import { useState } from "react";
import { useUser } from "../../../userComponent/userContext/UserContext";
import ManagerComponent from "./ManagerComponent"
import ManagerTeamComponent from "./ManagerTeamComponent";
import styles from './Manager.module.css';
import { display } from "@mui/system";

const Manager = () => {

    const { userInfo } = useUser();
    const [menuState, setMenuState] = useState(0);


    return (
        <div className={styles.managerContainer}>
            <div>
                <h1>매치결과 관리</h1>
            </div>
            <div style={{display : "flex"}}>
                <h2 onClick={() => setMenuState(0)} style={{padding : "4px 15px" , background : menuState === 0 ? "#DDDDDD" : ""}}>
                    개인매치
                </h2>
                <div style={{width : "10px"}}/>
                <h2 onClick={() => setMenuState(1)} style={{padding : "4px 15px" , background : menuState === 1 ? "#DDDDDD" : ""}}>
                    팀매치
                </h2>
            </div>
            <div>
                {userInfo && 
                (menuState === 1 ?
                <ManagerTeamComponent managerId={userInfo.id} /> 
                :                  
                <ManagerComponent managerId={userInfo.id} /> 
                )}            
            </div>
        </div>
    );
}

export default Manager;