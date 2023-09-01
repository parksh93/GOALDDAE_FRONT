import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  // 토큰 유효성 검사
  // const validToken = async () => {
  //  await fetch(`/user/validToken`, { method: "GET", credentials: 'include',})
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setValid(data[0]);
  //       })
  //       .catch(() => console.error("unValid"));
  // };
  
  const getUserInfo = async () => {
    await fetch("/user/getUserInfo", { method: "POST"})
    .then((res) => res.json())
    .then((data) => {
      if (data.nickname === null) {
        navigate("/socialSignup", { state: { email: data.email } });
      }

      setUserInfo(data);
    });
  };

  return (
    <UserContext.Provider value={{ getUserInfo, userInfo, valid, setValid, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
