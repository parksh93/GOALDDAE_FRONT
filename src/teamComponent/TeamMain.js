import TeamList from "./list/TeamList";
import TeamSearch from "./list/TeamSearch";

const TeamMain = () => {
    return(
            <div>
                <TeamSearch />
                <TeamList />
            </div>
    )
}

export default TeamMain;