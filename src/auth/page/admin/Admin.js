import React, {useEffect, useState} from 'react'
import './Admin.css';
import SideBar from './sideBar/SideBar';
import { useAdmin } from './AdminContext';
import AdminManagement from './manageMentPage/adminManagement/AdminManagementPage';
import BoardManagement from './manageMentPage/boardManagement/BoardManagementPage';

const Admin = () => {
  const {getAdminInfo} = useAdmin();
  const [menuState, setMenuState] = useState(0);
  useEffect(() => {
    getAdminInfo();
  },[]);

  return (
   <>
    <SideBar 
      menuState={menuState}
      setMenuState={setMenuState}
    />
    {menuState === 2 ?
    <BoardManagement />
    :
    menuState === 4 ? 
      <AdminManagement />
    : ""
    }
   </>
  )
}

export default Admin;
