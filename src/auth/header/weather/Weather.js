import { useUser } from "../../../userComponent/userContext/UserContext";
import {useState, useEffect, useCallback} from 'react';
import styles from "./Weather.module.css";
import {BsBrightnessHigh, BsCloudRain, BsCloudSun, BsCloudHaze} from 'react-icons/bs';
import {AiOutlineReload} from 'react-icons/ai';
import WeatherLoading from "./WeatherLoading";

const Weather = () => {
    const [sky, setSky] = useState("");
    const [temperature, setTemperature] = useState("");
    const [time, setTime] = useState("");
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);

    const {getUserInfo, userInfo} = useUser();

    useEffect(() => {
        getUserInfo();
    },[]);

    useEffect(() => {

        getNowWeather();
    },[userInfo])

    const getNowWeather = useCallback(() => {
        let city;
        if(userInfo !== null){
            if(userInfo.preferredCity !== null){
                city = userInfo.preferredCity;
            }else{
                city = "서울";
            }
        }else{
            city = "서울";
        }
    
        setCity(city);
        fetch("/weather/getNowWeather", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                city: city
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.precipitation === "강수없음"){
                setSky(data.sky);
            }else {
                setSky(0);
            }
            let minute = new Date().getMinutes();
            if(minute < 10){
                minute = "0" + minute ;
            }

            const time = data.fcstTime.substr(0,2) -1 + ":" + minute;
            setTime(time);
            setTemperature(data.temperature);
            setLoading(true);
        }).catch(() => {
            console.log("날씨를 가져오는데 실패했습니다.");
        });
    },[])

    return (
        <div className={styles.weatherMainDiv}>
            {loading ? 
            <>
            { sky === 0 ? <BsCloudRain className={styles.skyImg}/>
            : sky <= 5 ? <BsBrightnessHigh className={styles.skyImg}/>
            : sky <= 8 ? <BsCloudSun className={styles.skyImg}/>
            : <BsCloudHaze className={styles.skyImg} />
            }
            <div className={styles.otherDiv}>
                <span className={styles.weatherTitle}>현재 {city} 날씨</span>
                <AiOutlineReload className={styles.reload} onClick={() => {setLoading(false); getNowWeather();}}/>
                <span className={styles.time}>{time}</span>
            </div>
            <div className={styles.temperatureDiv}>
                <span className={styles.temperature}>{temperature}</span><span className={styles.dc}>°</span><span className={styles.c}>c</span><br/>
            </div>
            <div className={styles.skyDiv}>
            </div>
            </>
            : <WeatherLoading/>
            }
        </div>
    );
}

export default Weather;