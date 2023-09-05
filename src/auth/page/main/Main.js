import React from 'react';
import { UserProvider } from "../../../userComponent/userContext/UserContext";
import ImageSlide from './imageSlide/ImageSlide'
import TimeLine from './timeLine/TimeLine';
import MatchListMoreDetails from './timeLine/MatchListMoreDetails';

const Main = () => {
    return (
        <UserProvider> 
            <div>
                <ImageSlide />
                <TimeLine />
                <MatchListMoreDetails />
            </div>
        </UserProvider>
    );
}

export default Main;
