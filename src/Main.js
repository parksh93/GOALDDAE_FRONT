import { UserProvider } from "./userComponent/userContext/UserContext"
import LoginInfo from './LoginInfo';
import ImageSlide from './auth/imageSlide/ImageSlide';

const Main = () => {
    return(
        <UserProvider> 
            <div>
                <LoginInfo />
                <h1>메인</h1>
                <ImageSlide />
            </div>
        </UserProvider>
    )
}

export default Main;