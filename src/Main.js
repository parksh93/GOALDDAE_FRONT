import { UserProvider } from "./userComponent/userContext/UserContext"
import LoginInfo from './LoginInfo';

const Main = () => {
    return(
        <UserProvider> 
            <div>
                <LoginInfo />
                <h1>메인</h1>
            </div>
        </UserProvider>
    )
}

export default Main;