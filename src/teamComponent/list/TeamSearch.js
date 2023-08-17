import axios from "axios";
import { useEffect, useState } from "react";

function TeamSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [teams, setTeams] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]);

    useEffect(()=> {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try{
            const response = await axios.get('/list/search/teamName');
            setTeams(response.data);
            setFilteredTeams(response.data);
        }catch(error){
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
    };

    return(
        <div>
        <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search team..."
        />
        <ul>
            {filteredTeams.map(team => (
                <li key={team.id}>{team.name}</li>
        ))}
        </ul>
    </div>
    );

}

export default TeamSearch;
