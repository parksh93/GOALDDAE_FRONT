import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserTeamId } from './path-to-your-user-context'; // 실제 경로로 수정

const MyJoinedTeams = () => {
    const userTeamId = useUserTeamId();
    const [joinedTeams, setJoinedTeams] = useState([]);

    useEffect(() => {
        const fetchJoinedTeams = async () => {
            try {
                const response = await axios.get(`/team/list/myTeam${userTeamId}`); // 백엔드 엔드포인트에 맞게 수정
                setJoinedTeams(response.data);
            } catch (error) {
                console.error('가입한 팀을 불러올 수 없습니다.', error);
            }
        };

        fetchJoinedTeams();
    }, [userTeamId]);

    return (
        <div>
            <h2>내가 가입한 팀</h2>
            {joinedTeams.map((team) => (
                <div key={team.teamId}>
                    <h3>{team.teamName}</h3>
                    {/* 팀 정보 또는 기타 내용을 표시할 수 있음 */}
                </div>
            ))}
        </div>
    );
};

export default MyJoinedTeams;