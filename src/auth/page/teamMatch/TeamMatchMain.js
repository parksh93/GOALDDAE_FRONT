import React from 'react';
import Footer from "../../footer/Footer";
import NaviBar from "../main/naviBar/NaviBar";
import ImageSlide from "./ImageSlide/ImageSlide";
import Filter from "./filter/Filter";
import Loading from '../../../loading/Loading';
import { useLocation } from 'react-router-dom'; 

const TeamMatchMain = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); 
    }, [location]);

  return (
        <>
            <NaviBar />
            {isLoading ? (
              <div style={{ marginTop:'100px', marginLeft:'29%', left: "0px", width: "40%", height:"30%", zIndex:"9999"}}>
                  <Loading />
              </div>
                ) : (
                <>
                    <ImageSlide />
                    <Filter />
                    <Footer />
                </>
                )}
        </>
    )
}

export default TeamMatchMain;