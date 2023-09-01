import React from 'react';
import { UserProvider } from "./userComponent/userContext/UserContext";
import ImageSlide from './auth/imageSlide/ImageSlide';
import TimeLine from './auth/timeLine/TimeLine';
import MatchList from './auth/page/match/MatchList';
import ProvinceFilter from './auth/timeLine/ProvinceFilter';

const Main = () => {
    return (
        <UserProvider> 
            <div>
                <ImageSlide />
                <TimeLine />
                <ProvinceFilter />
                <MatchList />
            </div>
        </UserProvider>
    );
}

export default Main;
