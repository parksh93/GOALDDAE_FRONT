import React from 'react';
import TeamList from "./list/TeamList";
import styles from './TeamMain.module.css'
import MyTeam from './list/MyTeam';

const TeamMain = () => {
    return(
        <div className={styles.body}>
            <MyTeam /> 
            <TeamList />    
        </div>
    )
}

export default TeamMain;