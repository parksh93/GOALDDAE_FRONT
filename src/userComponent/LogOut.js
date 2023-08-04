import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();
    
    const logOut = async () => {
        const response = await fetch("/user/logout",{method: 'POST'});
        const data = await response.json();
    
        if(data[0] === true){
            navigate("/")
        }
    }
    
    logOut();
}

export default LogOut;