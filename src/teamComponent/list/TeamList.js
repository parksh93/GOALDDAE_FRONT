import React, { useState, useEffect } from 'react';
import axios from 'axios';
import throttle from 'lodash/throttle';


const areaOptions = [
    { value: "모든지역", label: "모든지역" },
    { value: "서울", label: "서울" },
    { value: "경기", label: "경기" },
    { value: "인천", label: "인천" },
    { value: "강원", label: "강원" },
    { value: "대전", label: "대전" },
    { value: "충남/세종", label: "충남/세종" },
    { value: "충북", label: "충북" },
    { value: "대구", label: "대구" },
    { value: "경북", label: "경북" },
    { value: "부산", label: "부산" },
    { value: "울산", label: "울산" },
    { value: "경남", label: "경남" },
    { value: "광주", label: "광주" },
    { value: "전남", label: "전남" },
    { value: "전북", label: "전북" },
    { value: "제주", label: "제주" },
];

const TeamList = ({ teamId }) => {
    const [teamList, setTeamList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [noNewData, setNoNewData] = useState(false);
    const [selectedArea, setSelectedArea] = useState('');

    const fetchTeamList = async (pageNum, area = '') => {
        try {
            setIsLoading(true);

            let requestPath;

            if (area) {
                if (area === '모든지역') {
                    requestPath = '/team/list';
                } else {
                    requestPath = '/team/list/area';
                }
            } else {
                requestPath = '/team/list';
            }
                        
            const response = await axios.get(`${requestPath}?page=${pageNum}&area=${area}`);
            
            const newTeamList = response.data;

            if (!newTeamList.some(newTeam => teamList.some(oldTeam => oldTeam.teamId === newTeam.teamId))) {
                if (newTeamList.length === 0) {
                    setNoNewData(true);
                }
                setTeamList((prevTeamList) => [...prevTeamList, ...newTeamList]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('팀 정보를 불러올 수 없습니다.', error);
        }
    };

    useEffect(() => {
        fetchTeamList(page, selectedArea);
    }, [page, selectedArea]);

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

    const handleAreaChange = (event) => {
        const newSelectedArea = event.target.value;
        setSelectedArea(newSelectedArea);
        setTeamList([]);
        setPage(1);
        setNoNewData(false);

        if (newSelectedArea === "모든지역") {
            fetchTeamList(1);
        } else {
            fetchTeamList(1, newSelectedArea);
        }
    };

    return (
        <div>
            <select value={selectedArea} onChange={handleAreaChange}>
                {areaOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {teamList.map((team) => (
                <div key={team.teamId}>
                    <h3>{team.teamProfileImgUrl} | {team.teamName}</h3>
                    <div>
                        <p>
                            {team.area} | {team.averageAge} | {team.entryGender} | <span style={{ color: team.recruiting ? 'red' : 'black' }}>{team.recruiting ? '모집중' : '모집종료'}</span>
                        </p>
                    </div>
                </div>
            ))}
            {isLoading && <p>불러오는 중...</p>}
            {noNewData && <p>데이터가 없습니다.</p>}
        </div>
    );
};

export default TeamList;
