import { Route, Routes } from 'react-router-dom';
import UserLogin from './userComponent/UserLogin';
import LogOut from './userComponent/LogOut';
import MyPage from './userComponent/MyPage';
import Main from './Main';
import SignupMain from './userComponent/signup/SignupMain';


const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<UserLogin />}/>
        <Route path='/logOut' element={<LogOut />}/>
        <Route path='/myPage' element={<MyPage />}/>
        <Route path='/signup' element={<SignupMain/>}/>
      </Routes>
  );
}

export default App;