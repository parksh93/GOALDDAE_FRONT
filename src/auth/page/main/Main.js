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
        <div>
            <NaviBar />
            <ImageSlide />
            <TimeLine />
            <MatchListMoreDetails />
            <div className="article-board-container">
                <div className="Article">
                    <Article />
                </div>
                <div className="BestBoard">
                    <BestBoard />
                </div>
            </div>
        </div>
    );
}

export default Main;
