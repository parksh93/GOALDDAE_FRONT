import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import Login from './userComponent/Login';
import MyPage from './userComponent/MyPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/myPage' element={<MyPage />}/>
    </Routes>
  );
}

export default App;