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
import Admin from './auth/page/admin/Admin';
import ChangeLostPasswordMain from './userComponent/changePassword/ChangePasswordMain';

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

              <Route path='/friend-list' element={<friend-list />} />
              <Route path="/admin" element={<Admin />} />
              <Route path='/changeLostPassword' element={<ChangeLostPasswordMain />} />
            </Routes>
          <Footer/> 
     </>
    </UserProvider>
  );
}

export default App;