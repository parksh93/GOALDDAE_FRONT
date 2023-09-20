import React, {useEffect, useState} from 'react'
import './Admin.css';
import SideBar from './sideBar/SideBar';
import { useAdmin } from './AdminContext';
import AdminManagement from './manageMentPage/adminManagement/AdminManagementPage';
import BoardManagement from './manageMentPage/boardManagement/BoardManagementPage';
import SoccerFieldManagement from './manageMentPage/soccerFieldManagement/SoccerFieldManagementPage';
import ManagerManagement from './manageMentPage/managerManagement/ManagerManagementPage';
import UserManagement from './manageMentPage/userManagement/UserManagementPage';

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
    {menuState === 0?
    <SoccerFieldManagement />
    :
    menuState === 1 ?
    <BoardManagement />
    :
    menuState === 2 ?
    <UserManagement />
    :
    menuState === 3 ?
    <ManagerManagement />
    :
    menuState === 4 ? 
      <AdminManagement />
    : ""
    }
   </>
  )
}

export default Admin;
