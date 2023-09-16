import {createContext, useContext, useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const AdminContext = createContext();

export const AdminProvier = ({children}) => {
    const navigate = useNavigate();
    const [adminInfo, setAdminInfo] = useState(null);

    const getAdminInfo = useCallback(async() => {
       await axios.post("/admin/getAdminInfo")
        .then(res => {
            setAdminInfo(res.data);
        })
        .catch((e) => {
            if(e.reponse){  // 응답이 이뤄졌으나 서버가 200 범위 외의 상태코드로 응답
                console.log(e.reponse.data);  
                console.log(e.response.status);
                console.log(e.response.headers);
                // navigate("/admin/login");
            }else if(e.request){    // 요청이 이뤄졌으나 응답을 받지 못한 상태
                console.log(e.request);
                setAdminInfo(null);
                navigate("/admin/login");
            }
        });
    },[]);

    const logout = async () => {
        const response = await fetch("/user/logout",{method: 'POST'});
        const data = await response.json();
        if(data === true){
            setAdminInfo(null);
            navigate("/admin/login")
        }
      }

    return (
        <AdminContext.Provider value={{getAdminInfo, adminInfo, logout}}>
            {children}
        </AdminContext.Provider>
    );
}

export const useAdmin = () => {
    return useContext(AdminContext);
}