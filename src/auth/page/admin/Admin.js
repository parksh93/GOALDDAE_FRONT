import FieldReservation from "./tableFieldReservation/FieldReservationTable";
import TeamMember from "./tableTeam/TeamMemberTable";
import FriendAccept from "./tableFriend/FriendAcceptTable";
import FriendAdd from "./tableFriend/FriendAddTable";
import FriendBlock from "./tableFriend/FriendBlockTable";
import FriendList from "./tableFriend/FriendListTable";
import MatchTeam from "./tableMatch/MatchTeamTable";
import MatchIndividual from "./tableMatch/MatchIndividualTable";
import TeamApply from "./tableTeam/TeamApplyTable";
import TeamMatchResult from "./tableTeam/TeamMatchResultTable";

const Admin = () => {
  return (
    <>
        <h3>관리자 페이지</h3>
            {/* 테이블생성*/} 
            <FieldReservation />

            <FriendAccept />
            <FriendAdd />
            <FriendBlock />
            <FriendList />
          
            <MatchTeam />
            <MatchIndividual />

            <TeamApply />
            <TeamMember />
            <TeamMatchResult />
    </>
  );
}

export default Admin; 
