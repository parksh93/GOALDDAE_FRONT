import React, { useState, useEffect } from 'react';
import axios from 'axios';
import throttle from 'lodash/throttle';

const TeamList = ({ teamId }) => {
    const [teamList, setTeamList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [noNewData, setNoNewData] = useState(false);

    const fetchTeamList = async (pageNum) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/team/list?page=${pageNum}`);
            const newTeamList = response.data;

            // 기존 팀 목록에 중복 데이터가 없을 때만 추가
            if (!newTeamList.some(newTeam => teamList.some(oldTeam => oldTeam.teamId === newTeam.teamId))) {
                if (newTeamList.length === 0) {
                    setNoNewData(true); // 새로운 데이터가 없을 경우 상태 변경
                }
                setTeamList((prevTeamList) => [...prevTeamList, ...newTeamList]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('팀 정보를 불러올 수 없습니다.', error);
        }
    };

    useEffect(() => {
        fetchTeamList(page);
    }, [page]);

    const handleScroll = throttle(() => {
        const scrollTop = Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop
        );
        const scrollHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
        );
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 400 && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, 300);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {teamList.map((team) => (
                <div key={team.teamId}>
                    <h2>{team.teamName}</h2>
                    <div>
                        <p>
                            {team.area} | {team.averageAge} | {team.entryGender}
                        </p>
                    </div>
                </div>
            ))}
            {isLoading && <p>불러오는 중...</p>}
            {noNewData && <p>새로운 데이터가 없습니다.</p>}
        </div>
    );
};

export default TeamList;
