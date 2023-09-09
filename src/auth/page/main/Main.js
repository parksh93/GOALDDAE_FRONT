import React from 'react';
import { UserProvider } from "../../../userComponent/userContext/UserContext";
import ImageSlide from './imageSlide/ImageSlide'
import TimeLine from './timeLine/TimeLine';
import MatchListMoreDetails from './timeLine/MatchListMoreDetails';
import NaviBar from './naviBar/NaviBar';
import Article from './article/Article';

const Main = () => {
    return (
        <UserProvider> 
            <div>
                <NaviBar />
                <Article />
                <ImageSlide />
                <TimeLine />
                <MatchListMoreDetails />
                
            </div>
        </UserProvider>
    );
}

export default Main;
