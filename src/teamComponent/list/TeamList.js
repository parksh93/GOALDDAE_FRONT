import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamList = ({teamId}) => {
    const [TeamList, setTeamList] = useState({});

    useEffect(() => {
        axios.get(`/team/list`)
            .then(response=> {
                console.log(response.data)
                setTeamList(response.data[0]);
            })
            .catch(error => {
                console.error('팀 정보를 확인할 수 없습니다.', error);
            });
        }, [teamId]);
    
    return(
        <div>
            <h2>{TeamList.teamName}</h2>
            <div>
                <p> {TeamList.area} | {TeamList.averageAge} | {TeamList.entryGender} </p>
            </div>
        </div>
    );

};

export default TeamList;

