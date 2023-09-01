import FieldReservation from "./tableFieldReservation/FieldReservation";
import TeamMember from "./tableTeam/TeamMember";
import FriendAccept from "./tableFriend/FriendAccept";
import FriendAdd from "./tableFriend/FriendAdd";
import FriendBlock from "./tableFriend/FriendBlock";
import FriendList from "./tableFriend/FriendList";
import MatchTeam from "./tableMatch/MatchTeam";
import MatchIndividual from "./tableMatch/MatchIndividual";
import TeamApply from "./tableTeam/TeamApply";
import TeamMatchResult from "./tableTeam/TeamMatchResult";
import {useEffect} from "react"

const Admin = () => {
  useEffect(() => {
    fetch("/admin/test",{method: "GET"});
  },[]);

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
