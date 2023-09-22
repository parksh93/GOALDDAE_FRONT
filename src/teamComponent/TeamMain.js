import React from 'react';
import TeamList from "./list/TeamList";
import styles from './TeamMain.module.css'
import MyTeam from './list/MyTeam';
import NaviBar from '../auth/page/main/naviBar/NaviBar';
import Footer from '../auth/footer/Footer';
import { useLocation } from 'react-router-dom';
import Loading from '../loading/Loading';

const TeamMain = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); 
    }, [location]);

    return(
        <div className={styles.body}>
            
            <div style={{marginBottom:'4%'}}>
                <NaviBar />
            </div>

            {isLoading ? (
                <div style={{ marginTop:'12%', marginLeft:'29%', top: "40px", left: "0px", width: "40%", height: "calc(100% - 50px)", zIndex:"9999"}}>
                   <Loading />
                </div>

                ) : (
                        <>
                            <MyTeam /> 
                            <TeamList />  
                            <Footer />
                        </>
                )}
        </div>
    )
}

export default TeamMain;