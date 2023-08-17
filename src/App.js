import React, {useState, useEffect} from 'react';

import { Route, Routes } from 'react-router-dom';
import UserLogin from './userComponent/login/LoginMain';
import LogOut from './userComponent/LogOut';
import Main from './Main';
import MyPage from './userComponent/MyPage';
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
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<UserLogin />}/>
          <Route path='/logOut' element={<LogOut />}/>
          <Route path='/myPage' element={<MyPage />}/>
          <Route path='/signup' element={<SignupMain/>}/>
        </Routes>
        <Footer/> 
        <Navigation />
        <LoginInfo />
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