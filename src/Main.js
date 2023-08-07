import LoginInfo from './LoginInfo';
import TimeLine from './auth/timeLine/timeLine';
import PrimarySearchAppBar from './auth/navigation/Navigation';

const Main = () => {
    return(
        <div>
            <PrimarySearchAppBar />
            <LoginInfo />
            <TimeLine />
        </div>
    )
}

export default Main;