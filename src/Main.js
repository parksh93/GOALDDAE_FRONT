import React from 'react';
import { UserProvider } from "./userComponent/userContext/UserContext";
import ImageSlide from './auth/imageSlide/ImageSlide';



const Main = () => {
    return (
        <UserProvider> 
            <div>
                <ImageSlide />

               
            </div>
        </UserProvider>
    );
}

export default Main;