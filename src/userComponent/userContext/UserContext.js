import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await fetch("/user/getUserInfo", { method: 'POST' });
  
      if (response.status === 200) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        // 에러 상황
        console.error("서버 응답 에러:", response.statusText);
      }
    } catch (error) {
      // 네트워크 에러
      console.error("네트워크 에러:", error);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
