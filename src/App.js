import React, {useState, useEffect} from 'react';

import { Route, Routes } from 'react-router-dom';
import UserLogin from './userComponent/login/LoginMain';
import LogOut from './userComponent/LogOut';
import Main from './Main';
import MyPage from './userComponent/MyPage';
import SignupMain from './userComponent/signup/SignupMain';
import Footer from './Footer';
import { UserProvider } from './userComponent/userContext/UserContext';



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
     </>
    </UserProvider>

  );
}

export default App;