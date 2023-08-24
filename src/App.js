import { Route, Routes } from 'react-router-dom';
import UserLogin from './userComponent/login/LoginMain';
import LogOut from './userComponent/LogOut';
import MyPage from './userComponent/MyPage';
import Main from './Main';
import SignupMain from './userComponent/signup/SignupMain';
import { UserProvider } from './userComponent/userContext/UserContext';
import Match from './auth/match/Match';
import Navigation from './auth/navigation/Navigation';
import LoginInfo from './LoginInfo';
import FindMain from './userComponent/find/FindMain';
import ChangeLostPasswordMain from './userComponent/changePassword/ChangePasswordMain';
import Footer from './Footer';
import SoccerFieldMain from './soccerField/SoccerFieldMain';
import UserChatList from './chat/UserChatList';
import UserChatRoom from './chat/UserChatRoom';

const App = () => {
  return (
    <UserProvider> 
      <>
        <Navigation />
        <LoginInfo />
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/login' element={<UserLogin />}/>
              <Route path='/logOut' element={<LogOut />}/>
              <Route path='/myPage' element={<MyPage />}/>
              <Route path='/signup' element={<SignupMain/>}/>
              <Route path='/find' element={<FindMain />} />
              <Route path='/find/:findMenuNum' element={<FindMain />} />
              <Route path='/Match' element={<Match />} />
              <Route path='/changeLostPassword' element={<ChangeLostPasswordMain />} />
              <Route path='/soccer_field/:fieldId' element={<SoccerFieldMain />} />
              <Route path='/userChatList' element={<UserChatList />} />
              <Route path='/userChatDetail' element={<UserChatRoom />} />
            </Routes>
          <Footer/> 
     </>
    </UserProvider>
  );
}

export default App;