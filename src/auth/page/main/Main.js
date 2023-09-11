import React from 'react';
import { UserProvider } from "../../../userComponent/userContext/UserContext";
import ImageSlide from './imageSlide/ImageSlide'
import TimeLine from './timeLine/TimeLine';
import MatchListMoreDetails from './timeLine/MatchListMoreDetails';
import NaviBar from './naviBar/NaviBar';
import Article from './article/Article';
import BestBoard from './bestBoard/BestBoard';
import './Main.css';

const Main = () => {
    return (
        <UserProvider> 
            <div>
                <NaviBar />
                <div className="article-board-container">
                    {/* <div className="Article">
                        <Article />
                        </div> */}
                    <div className="BestBoard">
                        <BestBoard />
                    </div>
                </div>
                <ImageSlide />
                <TimeLine />
                <MatchListMoreDetails />
            </div>
        </UserProvider>
    );
}

export default Main;
