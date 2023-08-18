import React from 'react';
import { UserProvider } from "./userComponent/userContext/UserContext";
import ImageSlide from './auth/imageSlide/ImageSlide';
import TimeLine from './auth/timeLine/TimeLine';

import FriendAccept from './auth/page/tableOperate/tableFriend/FriendAccept';
import FriendAdd from './auth/page/tableOperate/tableFriend/FriendAdd';
import FriendBlock from './auth/page/tableOperate/tableFriend/FriendBlock';
import FriendList from './auth/page/tableOperate/tableFriend/FriendList';
import FieldReservation from './auth/page/tableOperate/tableFieldReservation/FieldReservation';
import TeamMatchResult from './auth/page/tableOperate/tableTeam/TeamMatchResult';
import MatchTeam from './auth/page/tableOperate/tableMatch/MatchTeam';
import MatchIndividual from './auth/page/tableOperate/tableMatch/MatchIndividual';

const Main = () => {
    return (
        <UserProvider> 
            <div>
                <ImageSlide />
                <TimeLine />

                {/* 테이블생성 테스트*/} 
                <FriendAccept />
                <FriendAdd />
                <FriendBlock />
                <FriendList />
                <FieldReservation />

                <TeamMatchResult />
                <MatchTeam />
                <MatchIndividual />
            </div>
        </UserProvider>
    );
}

export default Main;
