import React from 'react';
import { UserProvider } from "./userComponent/userContext/UserContext";
import ImageSlide from './auth/imageSlide/ImageSlide';
import TimeLine from './auth/timeLine/TimeLine';
import MatchList from './auth/page/match/MatchList';

const Main = () => {
    return (
        <UserProvider> 
            <div>
                <ImageSlide />
                <TimeLine />
                <MatchList />
            </div>
        </UserProvider>
    );
}

export default Main;
