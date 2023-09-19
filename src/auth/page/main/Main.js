import React from 'react';
import ImageSlide from './imageSlide/ImageSlide'
import TimeLine from './timeLine/TimeLine';
import MatchListMoreDetails from './timeLine/MatchListMoreDetails';
import NaviBar from './naviBar/NaviBar';
import BestBoard from './bestBoard/BestBoard';
import Article from './article/Article';
import './Main.css';

const Main = () => {
    return (
        <div>
            <NaviBar />
            <ImageSlide />
            <div className="article-board-container">
                <div className="Article">
                    <Article />
                </div>
                <div className="BestBoard">
                    <BestBoard />
                </div>
            </div>
            <TimeLine />
            {/* <MatchListMoreDetails /> */}
            
        </div>
    );
}

export default Main;
