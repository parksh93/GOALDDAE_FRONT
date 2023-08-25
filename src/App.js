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
import SoccerFieldTable from './auth/page/admin/tableSoccerField/SoccerFieldTable';

import TeamCreate from './auth/page/team/TeamCreate';
import SoccerFieldDelete from './auth/page/admin/tableSoccerField/SoccerFieldDelete';
import SoccerFieldUpdate from './auth/page/admin/tableSoccerField/SoccerFieldUpdate';

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

              <Route path="/admin/soccerField/save" element={<SoccerFieldTable />} />
              <Route path="/admin/soccerField/delete" element={<SoccerFieldDelete/>} />
              <Route path="/admin/soccerField/update" element={<SoccerFieldUpdate/>} />
              <Route path="/admin/team/save" element={<TeamCreate />} />
            </Routes>
          <Footer/> 
     </>
    </UserProvider>
  );
}

export default App;