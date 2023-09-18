import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserLogin from './userComponent/login/LoginMain';
import MyPage from './userComponent/mypage/MyPage';
import UserPage from './userComponent/mypage/UserPage';
import SignupMain from './userComponent/signup/SignupMain';
import Header from './auth/header/Header';
import FindMain from './userComponent/find/FindMain';
import ChangeLostPasswordMain from './userComponent/changePassword/ChangePasswordMain';
import BoardMainPage from './boardComponent/BoardMainPage';
import SoccerFieldMain from './soccerField/SoccerFieldMain';
import UserChatMain from './chat/UserChatMain';
import Footer from './auth/footer/Footer';
import Admin from './auth/page/admin/Admin';
import SocialSignupMain from './userComponent/signup/SocialSignupMain';
import TeamSaveTable from './auth/page/admin/tableTeam/TeamSaveTable';
import TeamMain from './teamComponent/TeamMain';
import TeamDetail from './teamComponent/detail/TeamDetail';
import MyTeamDetail from './teamComponent/detail/MyTeamDetail';
import Main from './auth/page/main/Main';
import { AdminProvier } from './auth/page/admin/AdminContext';
import AdminLogin from './auth/page/admin/login/AdminLogin';
import AdminHeader from './auth/page/admin/header/AdminHeader';

const App = () => {
  return (
      <>
        <AdminProvier>
          <AdminHeader/>
          <Header />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<UserLogin />}/>
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
            
            <Route path='/team/list' element={<TeamMain/>}/>
            <Route path='/team/detail/:id' element={<TeamDetail />} />
            <Route path='/team/myTeamDetail/:id/:tabName' element={<MyTeamDetail />} />
            
            <Route path="/team/save" element={<TeamSaveTable/>} />
            <Route path="/admin" element={<Admin />} />
            <Route path='/admin/login' element={<AdminLogin />} /> 
          </Routes>
          </AdminProvier>
        <Footer/> 
      </>
  );
}

export default App;