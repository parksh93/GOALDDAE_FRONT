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
import Footer from './Footer';

const App = () => {
  return (
    <UserProvider> 
      <>
        <Navigation />
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/login' element={<UserLogin />}/>
              <Route path='/logOut' element={<LogOut />}/>
              <Route path='/myPage' element={<MyPage />}/>
              <Route path='/signup' element={<SignupMain/>}/>
              <Route path='/find' element={<FindMain />} />
              <Route path='/find/:findMenuNum' element={<FindMain />} />
              <Route path='/Match' element={<Match />} />
            </Routes>
          <Footer/> 
     </>
    </UserProvider>
  );
}

export default App;