import { Route, Routes } from 'react-router-dom';
import UserLogin from './userComponent/login/LoginMain';
import LogOut from './userComponent/LogOut';
import MyPage from './userComponent/MyPage';
import Main from './Main';
import SignupMain from './userComponent/signup/SignupMain';
import Footer from './Footer';
import FindMain from './userComponent/find/FindMain';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<UserLogin />}/>
        <Route path='/logOut' element={<LogOut />}/>
        <Route path='/myPage' element={<MyPage />}/>
        <Route path='/signup' element={<SignupMain/>}/>
        <Route path='/find' element={<FindMain />} />
        <Route path='/find/:findMenuNum' element={<FindMain />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;