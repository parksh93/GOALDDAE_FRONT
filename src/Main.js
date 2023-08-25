import React from 'react';
import { UserProvider } from "./userComponent/userContext/UserContext";
import ImageSlide from './auth/imageSlide/ImageSlide';
import TimeLine from './auth/timeLine/TimeLine';



const Main = () => {
    return (
        <UserProvider> 
            <div>
                <ImageSlide />
                <TimeLine />

               
            </div>
        </UserProvider>
    );
}

export default Main;
