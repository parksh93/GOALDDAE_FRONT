import { useNavigate } from 'react-router-dom';
import { useUser } from './userContext/UserContext';

const LogOut = () => {
    const navigate = useNavigate();
    const {setUserInfo, setValid} = useUser();

    const logOut = async () => {
        const response = await fetch("/user/logout",{method: 'POST'});
        const data = await response.json();
        if(data === true){
            setUserInfo(null);
            setValid(false);
            navigate("/")
        }
    }
    
    logOut();
}

export default LogOut;