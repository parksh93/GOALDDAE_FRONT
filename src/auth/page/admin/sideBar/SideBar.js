import React from "react";
import { Link } from "react-router-dom";
import SidebarItem from "./SideBarItem.js";
import './SideBar.css'; 

function Sidebar() {

  const menus = [
    { name: "구장 등록", path: "/admin/soccerField/save"},
    { name: "구장 수정", path: "/admin/soccerField/update"},
    { name: "구장 삭제", path: "/admin/soccerField/delete"},
    { name: "팀 생성", path: "/admin/team/save"}

  ];

  return (
    <>
        <div className="sidebar">
        <h3>관리자 페이지</h3>
        {menus.map((menu, index) => {
            return (
            <Link to={menu.path} key={index}>
                <SidebarItem
                menu={menu}
                />
            </Link>
            );
        })}
        </div>
    </>
  );
}

export default Sidebar;