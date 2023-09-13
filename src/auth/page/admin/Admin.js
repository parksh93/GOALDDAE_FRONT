import React, {useEffect} from 'react'
import './Admin.css';
import SideBar from './sideBar/SideBar';
import { useAdmin } from './AdminContext';

const Admin = () => {
  const {getAdminInfo} = useAdmin();
  useEffect(() => {
    getAdminInfo();
  },[]);

  return (
   <>
    <SideBar />
   </>
  )
}

export default Admin;
