import "./Navigation.css";
import logo from "../image/goalddaeLogo.png"
import { Link } from "react-router-dom";
import FieldSearch from "../search/FieldSearch";
import LoginInfo from "../../loginInfo/LoginInfo";

const Navigation = () => {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="로고" />
          </Link>
        </div>
        <div className="search-results">
          <div className="search">
            <FieldSearch />
          </div>
        </div>
        <LoginInfo />
      </div>
    </>
  );
};

export default Navigation;
