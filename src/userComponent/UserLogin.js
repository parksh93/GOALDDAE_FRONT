import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: '',
        password: ''
    });
    const [loginCheckMsg, setLoginCheckMsg] = useState('');

    const onKeyPress = e => {
        if(e.key === 'Enter'){
            submitLogin();   
        }
    }

    const getLoginCheck = async () => {
        const response = await fetch("/user/login",{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            loginId: user.id,
                            password: user.password
                        })});

        const data = await response.json();
        if(data[0] === true){
            navigate("/")
        }else{
            setLoginCheckMsg("아이디와 비밀번호를 확인해주세요")
        }
}

const submitLogin = () => {
    if(document.querySelector(".inputId").value === ''){
        setLoginCheckMsg("아이디를 입력해주세요");
        return;
    }
    
    if(document.querySelector(".inputPw").value === ''){
        setLoginCheckMsg("비밀번호를 입력해주세요");
        return;
    }
    getLoginCheck();
        
    }

    const onChacnge = useCallback(e => {
        const changeUser = {
            ...user,
            [e.target.name]: e.target.value

        }

        setUser(changeUser);
    },[user]);

    return (
        <div>
            <input type="text" name="id" placeholder="아이디" onChange={onChacnge} value={user.id} onKeyDown={onKeyPress} className="inputId"/><br/>
            <input type='password' name="password" placeholder="비밀번호" onChange={onChacnge} value={user.password} onKeyDown={onKeyPress} className="inputPw"/><br/>
            <input type='button' value="로그인" onClick={submitLogin}/>

            <p style={{color: 'red'}}>{loginCheckMsg}</p>
        </div>    
    )
}

export default UserLogin;