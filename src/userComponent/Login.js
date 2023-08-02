import { useCallback, useState } from "react"
import { Navigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        id: '',
        password: ''
    });
    const [loginCheck, setLoginCheck] = useState('');
    const [loginCheckMsg, setLoginCheckMsg] = useState('');
    // let loginCheckMsg = '';

    const onKeyPress = e => {
        if(e.key === 'Enter'){
            submitLogin();   
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
        
        fetch("/user/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                loginId: user.id,
                password: user.password
            })
        }).then(res => res.json())
        .then(data => {
            setLoginCheck(data[0]);
        })
    }


    const onChacnge = useCallback(e => {
        const changeUser = {
            ...user,
            [e.target.name]: e.target.value

        }

        setUser(changeUser);
    },[user]);


    if(loginCheck === true){
        return <Navigate to='/' replace={true} />;
    }

    return (
        <div>
            <input type="text" name="id" placeholder="아이디" onChange={onChacnge} value={user.id} onKeyDown={onKeyPress} className="inputId"/><br/>
            <input type='password' name="password" placeholder="비밀번호" onChange={onChacnge} value={user.password} onKeyDown={onKeyPress} className="inputPw"/><br/>
            <input type='button' value="로그인" onClick={submitLogin}/>

            {loginCheck === false ? <p style={{color: 'red'}}>아이디와 비밀번호를 확인해주세요</p> : <p style={{color: 'red'}}>{loginCheckMsg}</p>}
        </div>    
    )
}

export default Login;