import TeamFilter from "./list/TeamFilter";
import TeamList from "./list/TeamList";
import TeamSearch from "./list/TeamSearch";

const TeamMain = () => {
    return(
            <div>
                {/*<TeamFilter />*/}
                <TeamSearch />
                <TeamList />
            </div>
    )
}

export default TeamMain;