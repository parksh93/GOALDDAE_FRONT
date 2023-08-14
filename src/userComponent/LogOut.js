import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();
    
    const logOut = async () => {
        const response = await fetch("/user/logout",{method: 'POST'});
        const data = await response.json();
        if(data === true){
            navigate("/")
        }
    }
    
    logOut();
}

export default LogOut;