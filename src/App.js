import { Route, Routes } from 'react-router-dom';
import UserLogin from './userComponent/login/LoginMain';
import LogOut from './userComponent/LogOut';
import MyPage from './userComponent/MyPage';
import Main from './Main';
import SignupMain from './userComponent/signup/SignupMain';
import Footer from './Footer';
import { UserProvider } from './userComponent/userContext/UserContext';
import TeamList from './teamComponent/list/TeamList';
import SearchBar from './teamComponent/list/SearchBar';

const App = () => {
  return (
    <UserProvider> 
      <>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<UserLogin />}/>
          <Route path='/logOut' element={<LogOut />}/>
          <Route path='/myPage' element={<MyPage />}/>
          <Route path='/signup' element={<SignupMain/>}/>
          <Route path='/team/list/serch' element={<SearchBar />} />
          <Route path='/team/list' element={<TeamList/>}/>

        </Routes>
        <Footer/> 
     </>
    </UserProvider>
  );
}

export default App;