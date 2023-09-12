import { useUser } from "../../../userComponent/userContext/UserContext";
import moment from 'moment';
import {useState, useEffect} from 'react';
import styles from "./Weather.module.css";
import {BsBrightnessHigh, BsCloudRain, BsCloudSun, BsCloudHaze} from 'react-icons/bs';

const Weather = () => {
    // const [nowMinute, setNowMinute] = useState(moment().format("m"));
    const [sky, setSky] = useState("");
    const [temperature, setTemperature] = useState("");
    const [windDirection, setWindDirection] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [precipitation, setPrecipitation] = useState("");
    const [time, setTime] = useState("");
    const [city, setCity] = useState("");

    const {getUserInfo, userInfo} = useUser();

    useEffect(() => {
        getUserInfo();
    },[]);

    useEffect(() => {
        let city;
        if(userInfo !== null){
            if(userInfo.preferredCity !== ""){
                city = userInfo.preferredCity;
            }else{
                city = "서울";
            }
        }else{
            city = "서울";
        }

        fetch("/weather/getNowWeather", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                city: city
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data[0].precipitation === "강수없음"){
                if(data[0].sky <= 5){
                    setSky("맑음");
                }else if(data[0].sky <= 8)
                setSky("구름 많음");
                else{
                    setSky("흐림");
                }
            }else {
                setSky(`비/강수량 : ${data[0].precipitation}%`);
            }
            
            setCity(data[0].city);
            setTime(data[0].fcstTime);
            setTemperature(data[0].temperature);
            setWindDirection(data[0].windDirection);
            setWindSpeed(data[0].windSpeed);
        });
    },[])

    return (
        <div className={styles.weatherMainDiv}>
            <div className={styles.otherDiv}>
                <span className={styles.weatherTitle}>현재 날씨</span><br/>
            </div>
            <div className={styles.skyDiv}>
                <span>{sky}</span>
            </div>
            <div className={styles.temperatureDiv}>
                <span className={styles.temperature}>{temperature}</span> <span className={styles.dc}>º</span><span className={styles.c}>c</span>
            </div>
        </div>
    );
}

export default Weather;