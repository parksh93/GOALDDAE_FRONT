import React from 'react';
import TeamList from "./list/TeamList";
import TeamSearch from "./list/TeamSearch"

const TeamMain = () => {
    return(
        <>
            <TeamSearch />
            <TeamList />
        </>
    )
}

export default TeamMain;