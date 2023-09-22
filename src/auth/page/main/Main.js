import React from 'react';
import ImageSlide from './imageSlide/ImageSlide'
import TimeLine from './timeLine/TimeLine';
import MatchListMoreDetails from './timeLine/MatchListMoreDetails';
import NaviBar from './naviBar/NaviBar';
import BestBoard from './bestBoard/BestBoard';
import Article from './article/Article';
import Loading from '../../../loading/Loading';
import { useLocation } from 'react-router-dom'; 
import './Main.css';
import Footer from '../../footer/Footer';

const Main = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); 
    }, [location]);

    return (
        <div>
            <NaviBar />
            {isLoading ? (
              <div style={{ marginTop:'100px', marginLeft:'29%', left: "0px", width: "40%", height:"30%", zIndex:"9999"}}>
                  <Loading />
              </div>
            ) : (
                <>
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
                    <Footer />
                </>
            )}
        </div>
    );
}

export default Main;
