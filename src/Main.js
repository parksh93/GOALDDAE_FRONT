import React from 'react';
import { UserProvider } from "./userComponent/userContext/UserContext";
import ImageSlide from './auth/imageSlide/ImageSlide';
import FieldSearch from './auth/search/FieldSearch';
import Navigation from './auth/navigation/Navigation';

const Main = () => {
    return (
        <UserProvider> 
            <div>
                <h1>메인</h1>
                <ImageSlide />
            </div>
        </UserProvider>
    );
}

export default Main;
