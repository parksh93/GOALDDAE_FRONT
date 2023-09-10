import React from 'react';
import { UserProvider } from "../../../userComponent/userContext/UserContext";
import ImageSlide from './imageSlide/ImageSlide'
import TimeLine from './timeLine/TimeLine';
import MatchListMoreDetails from './timeLine/MatchListMoreDetails';
import NaviBar from './naviBar/NaviBar';
import Article from './article/Article';
import BestBoard from './bestBoard/BestBoard';

const Main = () => {
    return (
        <UserProvider> 
            <div>
                <NaviBar />
                <div style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: "1%",
                    marginBottom: "1%"
                }}>
                    <div style={{ marginRight: '3%' }}>
                        <Article />
                    </div>
                    <BestBoard />
                </div>
                <ImageSlide />
                <TimeLine />
                <MatchListMoreDetails />
            </div>
        </UserProvider>
    );
}

export default Main;
