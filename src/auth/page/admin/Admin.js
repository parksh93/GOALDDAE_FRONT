import React, {useEffect, useState} from 'react'
import './Admin.css';
import SideBar from './sideBar/SideBar';
import { useAdmin } from './AdminContext';
import AdminManageMent from './manageMentPage/adminManagement/AdminManageMentPage';

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
    {menuState === 4 ? 
      <AdminManageMent />
    : ""
    }
   </>
  )
}

export default Admin;
