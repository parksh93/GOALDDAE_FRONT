import { useEffect } from 'react';
import { useAdmin } from '../AdminContext';
import styles from './AdminHeader.module.css';
import {Link} from 'react-router-dom';

const AdminHeader = () => {
    const {getAdminInfo, adminInfo, logout} = useAdmin();

    useEffect(() => {
        if(window.location.pathname.startsWith('/admin')){
            getAdminInfo();
        }
    },[])

    if(window.location.pathname.startsWith('/admin')){
        return (
            <div className={styles.header}>
                <Link to="/admin"><img src="https://kr.object.ncloudstorage.com/goalddae-bucket/public/goalddaeLogo.webp" alt="로고" className={styles.logo}/></Link>
                <span className={styles.title}>Admin</span>
                <div className={styles.loginInfo}>
                    {adminInfo === null ?
                        <Link to="/admin/login" className={styles.loginInfoBtn}>로그인</Link>
                        :
                        <>
                            <span className={styles.adminName}>{adminInfo.name}</span>
                            <Link to="/admin/login" className={styles.loginInfoBtn} onClick={() => logout()}>로그아웃</Link>
                        </>
                    }
                </div>
            </div>
        );
    }
}

export default AdminHeader;