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
import React from 'react'
import './Admin.css';
import SideBar from './sideBar/SideBar';

const Admin = () => {
  return (
   <>
    <SideBar />
   </>
  )
}

export default Admin;
