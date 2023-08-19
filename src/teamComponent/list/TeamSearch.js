import axios from "axios";
import React, { useEffect, useState, useRef } from "react"; // 'React' 및 'useRef' 추가
import styles from './List.module.css';

function TeamSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [teams, setTeams] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // 추가: 드롭다운을 배치할 엘리먼트의 Ref 생성
    const dropdownContainerRef = useRef(null);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await axios.get('/list/search/teamName');
            setTeams(response.data);
        } catch (error) {
            console.error('팀 정보를 가져오지 못 했습니다.', error);
        }
    };

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        const filtered = teams.filter(team =>
            team.name.toLowerCase().includes(newSearchTerm.toLowerCase())
        );
        setFilteredTeams(filtered);
        setIsDropdownOpen(true);
    };

    const handleTeamSelect = (selectedTeam) => {
        setSearchTerm(selectedTeam.name);
        setIsDropdownOpen(false);
    };

    // 추가: 드롭다운 위치 계산 및 설정
    useEffect(() => {
        if (dropdownContainerRef.current && isDropdownOpen) {
            const dropdownContainerRect = dropdownContainerRef.current.getBoundingClientRect();
            const dropdownHeight = dropdownContainerRect.height;
            dropdownContainerRef.current.style.position = "relative";
            dropdownContainerRef.current.style.marginBottom = `${dropdownHeight}px`;
        }
    }, [isDropdownOpen]);

    return (
        <div ref={dropdownContainerRef}> {/* 엘리먼트의 위치 정보를 활용하기 위해 Ref 추가 */}
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search team..."
                className={styles["search-input"]}
            />
            {isDropdownOpen && (
                <ul className={styles["dropdown"]}>
                    {filteredTeams.map(team => (
                        <li
                            key={team.id}
                            onClick={() => handleTeamSelect(team)}
                            className={styles["dropdown-item"]}
                        >
                            {team.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TeamSearch;
