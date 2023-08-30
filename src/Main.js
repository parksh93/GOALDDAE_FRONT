import React from 'react';
import { UserProvider, useUser } from "./userComponent/userContext/UserContext";
import ImageSlide from './auth/imageSlide/ImageSlide';
import TimeLine from './auth/timeLine/TimeLine';
import {useEffect} from 'react'


const Main = () => {
    const {validToken} = useUser();

    useEffect(() => {
        validToken();
    },[]);

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
