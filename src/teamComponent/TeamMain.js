import React from 'react';
import TeamList from "./list/TeamList";
import styles from './TeamMain.module.css'
import MyTeam from './list/MyTeam';
import NaviBar from '../auth/page/main/naviBar/NaviBar';

const TeamMain = () => {
    return(
        <div className={styles.body}>
            <div style={{marginBottom:'4%'}}>
                <NaviBar />
            </div>
            <MyTeam /> 
            <TeamList />    
        </div>
    )
}

export default TeamMain;