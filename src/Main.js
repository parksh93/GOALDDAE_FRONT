import React from 'react';
import { useUser } from "./userComponent/userContext/UserContext";
import ImageSlide from './auth/imageSlide/ImageSlide';
import TimeLine from './auth/timeLine/TimeLine';
import {useEffect} from 'react'




const Main = () => {
    const {getUserInfo} = useUser();

    useEffect(() => {
        getUserInfo();
    },[])

    return (
        <div>
            <ImageSlide />
            <TimeLine />
        </div>
    );
}

export default Main;
