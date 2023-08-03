import { useEffect, useState } from "react";
import { Link } from "react-router-dom" 


const LoginInfo = () => {
    const [userInfo, setUserInfo] = useState('');
    
    const getUserInfo = async () => {
        const response = await fetch("/user/getUserInfo",{method: 'POST'});
        const data = await response.json();
        setUserInfo(data[0]);
    }
        
    useEffect(() => {
        getUserInfo();
    },[])


    return (
        <div style={{border: '1px solid black', width: "100%", height: "45px"}}>
            <div style={{float: 'right'}}>
                { userInfo === "null" ?
                    <Link to="/login">로그인</Link> :
                    <div>
                        <Link to="/myPage">{userInfo.nickname}</Link><br/>
                        <Link to="/logOut" >로그아웃</Link>
                    </div>
                }
            </div>
        </div>
    )
}


export default LoginInfo;