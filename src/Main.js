import { Link } from "react-router-dom" 
import cookie from 'react-cookies'

const Main = () => {
    return (
        <>
            <h1>메인</h1>
            {cookie.load('token') === undefined ?
                <Link to="/login">로그인</Link> :
                <Link to="/myPage">유저 이름</Link>
            }
        </>
    )
}


export default Main;