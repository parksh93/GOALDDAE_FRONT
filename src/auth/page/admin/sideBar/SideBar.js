import React,{useState} from "react";
import { Link } from "react-router-dom";
import SidebarItem from "./SideBarItem.js";
import './SideBar.css'; 

function Sidebar({menuState, setMenuState}) {

  const menus = [
    { name: "팀관리"},
    { name: "구장관리"},
    { name: "사용자관리"},
    { name: "관리자관리"}

  ];

  return (
    <>
        <div className="sidebar">
        <h2>MENU</h2>
        {menus.map((menu, index) => {
            return (
              <SidebarItem
                menu={menu}
                index={index}
                menuState={menuState}
                setMenuState={setMenuState}
              />
            );
        })}
        </div>
    </>
  );
}

export default Sidebar;