import { Route, Routes } from 'react-router-dom';
import UserLogin from './userComponent/login/LoginMain';
import LogOut from './userComponent/LogOut';
import MyPage from './userComponent/MyPage';
import Main from './Main';
import SignupMain from './userComponent/signup/SignupMain';
import { UserProvider } from './userComponent/userContext/UserContext';
import Navigation from './auth/navigation/Navigation';
import LoginInfo from './loginInfo/LoginInfo';
import FindMain from './userComponent/find/FindMain';
import Footer from './footer/Footer';
import Match from './auth/page/match/Match';

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
              <Route path='/friend-list' element={<friend-list />} />
            </Routes>
          <Footer/> 
     </>
    </UserProvider>
  );
}

export default App;