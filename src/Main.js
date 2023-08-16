import React from 'react';
import { UserProvider } from "./userComponent/userContext/UserContext";
import ImageSlide from './auth/imageSlide/ImageSlide';
import TimeLine from './auth/timeLine/TimeLine';

const Main = () => {
    return (
        <UserProvider> 
            <div>
                <h1>메인</h1>
                <ImageSlide />
                <TimeLine />
            </div>
        </UserProvider>
    );
}

export default Main;
