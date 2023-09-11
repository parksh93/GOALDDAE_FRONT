import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import UserLogin from './userComponent/login/LoginMain';
import LogOut from './userComponent/LogOut';
import MyPage from './userComponent/mypage/MyPage';
import UserPage from './userComponent/mypage/UserPage';
import SignupMain from './userComponent/signup/SignupMain';
import { UserProvider, useUser } from './userComponent/userContext/UserContext';
import Navigation from './navigation/Navigation';
import FindMain from './userComponent/find/FindMain';
import ChangeLostPasswordMain from './userComponent/changePassword/ChangePasswordMain';
import BoardMainPage from './boardComponent/BoardMainPage';
import SoccerFieldMain from './soccerField/SoccerFieldMain';
import UserChatMain from './chat/UserChatMain';
import Footer from './footer/Footer';
import Admin from './auth/page/admin/Admin';
import SocialSignupMain from './userComponent/signup/SocialSignupMain';
import Loading from './loading/Loading';
import SoccerFieldTable from './auth/page/admin/tableSoccerField/SoccerFieldTable';
import SoccerFieldDelete from './auth/page/admin/tableSoccerField/SoccerFieldDelete';
import SoccerFieldUpdate from './auth/page/admin/tableSoccerField/SoccerFieldUpdate';
import TeamSaveTable from './auth/page/admin/tableTeam/TeamSaveTable';
import Main from './auth/page/main/Main';


const App = () => {
  return (
      <>
        <Navigation />
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/login' element={<UserLogin />}/>
              <Route path='/logOut' element={<LogOut />}/>
              <Route path='/myPage' element={<MyPage />}/>
              <Route path="/myPage/:userId" element={<UserPage />} />
              <Route path='/signup' element={<SignupMain/>}/>
              <Route path='/socialSignup' element={<SocialSignupMain/>}/>
              <Route path='/find' element={<FindMain />} />
              <Route path='/find/:findMenuNum' element={<FindMain />} />
              <Route path='/changeLostPassword' element={<ChangeLostPasswordMain />} />
              <Route path='/board/*' element={<BoardMainPage />} />
              <Route path='/soccer_field/:fieldId' element={<SoccerFieldMain />} />
              <Route path='/userChat' element={<UserChatMain />} />
              <Route path='/friend-list' element={<friend-list />} />
              <Route path='/changeLostPassword' element={<ChangeLostPasswordMain />} />

              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/soccerField/save" element={<SoccerFieldTable />} />
              <Route path="/admin/soccerField/delete" element={<SoccerFieldDelete/>} />
              <Route path="/admin/soccerField/update" element={<SoccerFieldUpdate/>} />
              <Route path="/admin/team/save" element={<TeamSaveTable/>} />
            </Routes>
        <Footer/> 
      </>
  );
}

export default App;