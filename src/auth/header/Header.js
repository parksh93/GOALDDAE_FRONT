import "./Header.css";
import logo from "./image/goalddaeLogo.png"
import { Link } from "react-router-dom";
import FieldSearch from "./search/FieldSearch";
import LoginInfo from "../../loginInfo/LoginInfo";

const Header = () => {
  return (
    <>
      <div className="navbar">
        <div className="logoAndSearchDiv">
          <div className="logo">
            <Link to="/">
              <img src="/img/goalddaeLogo.png" alt="로고" />
            </Link>
          </div>
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
