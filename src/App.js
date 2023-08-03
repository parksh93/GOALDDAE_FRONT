import { Route, Routes } from 'react-router-dom';
import UserLogin from './userComponent/UserLogin';
import LogOut from './userComponent/LogOut';
import MyPage from './userComponent/MyPage';
import Main from './Main';

const App = () => {
  return (
      
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<UserLogin />}/>
        <Route path='/myPage' element={<MyPage />}/>
        <Route path='/logOut' element={<LogOut />}/>
      </Routes>
  );
}

export default App;