import "./Header.css";
import logo from "./image/goalddaeLogo.png"
import { Link } from "react-router-dom";
import FieldSearch from "./search/FieldSearch";
import LoginInfo from "./loginInfo/LoginInfo";
import Weather from "./weather/Weather";

const Header = () => {
  // 관리자 페이지에서는 안보이게 설정
  if(window.location.pathname.startsWith('/admin')) return null;
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