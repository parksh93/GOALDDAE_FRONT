import "./Header.css";
import logo from "./image/goalddaeLogo.png"
import { Link } from "react-router-dom";
import FieldSearch from "./search/FieldSearch";
import LoginInfo from "./loginInfo/LoginInfo";
import Weather from "./weather/Weather";
import WeatherLoading from "./weather/WeatherLoading";
import {useState} from 'react';

const Header = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="logoAndSearchDiv">
          <div className="logo">
            <Link to="/">
              <img src="/img/goalddaeLogo.png" alt="로고" />
            </Link>
          </div>
          <Weather />
          <div className="search-results">
            <div className="search">
              <FieldSearch />
            </div>
          </div>
        </div>
        <LoginInfo />
      </div>
    </>
  );
};

export default Header;
