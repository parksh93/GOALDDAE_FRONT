import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import throttle from 'lodash/throttle';
import styles from './List.module.css';
import TeamSearch from './TeamSearch';
import TimeLineLoading from '../../auth/page/main/timeLine/TimeLineLoading';



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

let cachedTeamList = [];

const TeamList = ({}) => {
    const [teamList, setTeamList] = useState(cachedTeamList);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [noNewData, setNoNewData] = useState(false);
    const [selectedArea, setSelectedArea] = useState('');
    const [recruiting, setRecruiting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTeamList(page, selectedArea, recruiting); 
    }, []);

    const fetchTeamList = async (pageNum, area = '', recruiting = true) => {
        try {
            setIsLoading(true);
    
            let requestPath;
    
            if (area) {
                if (area === '모든지역') {
                    if (recruiting) {   // 모든지역, recruiting = true
                        requestPath = '/team/list/recruiting';   
                    } else {    // 모든지역, recruiting false
                        requestPath = '/team/list';
                    }
                } else {    // area !== 모든지역 
                    if (recruiting) {   // 다른 지역, recruiting = true
                        requestPath = '/team/list/areaAndRecruiting';
                    } else {    // 다른 지역, recruiting = false
                        requestPath = '/team/list/area';
                    }
                }
            } else {    // arae === null
                if (recruiting) {   // area === null, recruiting = true
                    requestPath = '/team/list/recruiting';
                } else {    // area === null, recruiting = false
                    requestPath = '/team/list';
                }
            }            
    
            const response = await axios.get(`${requestPath}?page=${pageNum}&area=${area}&recruiting=${recruiting}`);
    
            const newTeamList = response.data;
    
            if (!newTeamList.some(newTeam => teamList.some(oldTeam => oldTeam.teamId === newTeam.teamId))) {
                if (newTeamList.length === 0) {
                    setNoNewData(true);
                }
                cachedTeamList.push(...newTeamList);
                setTeamList(cachedTeamList);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('팀 정보를 불러올 수 없습니다.', error);
        }
    };

    // 무한스크롤
    useEffect(() => {
        fetchTeamList(page, selectedArea, recruiting); 
    }, [page, selectedArea, recruiting]); 

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

        if (scrollTop + clientHeight >= scrollHeight - 700 && !isLoading) {
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
        cachedTeamList = [];
        setPage(1);
        setNoNewData(false);
    };

    const handleRecruitingChange = (event) => {
        setRecruiting(event.target.value === 'recruiting');

        setTeamList([]); // 팀리스트 리셋
        cachedTeamList = [];
        setPage(1); // 페이지 리셋
        setNoNewData(false);
    };

    const handleTeamClick = (id) => {
        navigate(`/team/detail/${id}`);
    };

    return (
        <div className={styles.teamListBody}>
            <div className={styles.filtes}>
                <select className={styles.areaFilter} value={selectedArea} onChange={handleAreaChange}>
                    {areaOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <select className={styles.recruitingFilter} value={recruiting ? 'recruiting' : 'all'} onChange={handleRecruitingChange}>
                    <option value="all">전체 팀</option>
                    <option value="recruiting">모집중 팀</option>
                </select>
                    <TeamSearch /> 
            </div>

            {teamList.map((team) => (
                <div className={styles.teamCard} key={team.id} onClick={() => handleTeamClick(team.id)}>
                    <div className={styles.teamInfoContainer}>
                        <div className={styles.circularImageContainer}>
                            <div className={styles.circularImage}>
                                <img className={styles.teamProfileImgUrl} src={team.teamProfileImgUrl} alt={team.teamName} />
                            </div>
                        </div>
                        <div>
                            <h3>{team.teamName}</h3>
                                <p className={styles.teamInfo}>
                                    <span>{team.area}</span><span>{team.averageAge}</span><span>{team.entryGender}</span>                                
                                    <span className={team.recruiting ? styles.teamRecruiting : ''}>
                                        {team.recruiting ? ' 모집중' : ' 모집종료'}
                                    </span>
                                </p>
                        </div>
                    </div>
                </div>
            ))}
            <div className={styles.loading}>
                {isLoading ? ( 
                    <div className={styles.loadingDiv}>
                        <TimeLineLoading />
                    </div>
                ) : (
                    noNewData && <h3>해당하는 팀이 없습니다.</h3>
                )}
            </div>
        </div>
    );
};

export default TeamList;