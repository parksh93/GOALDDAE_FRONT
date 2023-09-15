import React from "react";

function SidebarItem({ menu, index, menuState, setMenuState }) {
  return (
    <div className="sidebar-item">
      <p onClick={() => setMenuState(index)} style={index === menuState ? {fontWeight: "600"}:{}}>{menu.name}</p>
    </div>
  );
}

export default SidebarItem;