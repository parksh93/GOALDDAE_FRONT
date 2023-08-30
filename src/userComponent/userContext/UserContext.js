import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [valid, setValid] = useState(false);
  const userId = useRef();
  const navigate = useNavigate();

  // 토큰 유효성 검사
  const validToken = async () => {
      await fetch(`/user/validToken`, { method: "GET"})
      .then((res) => res.json())
      .then((data) => {
        setValid(data[0]);
      })
      .catch(() => console.error("unValid"));
  };
  
  const getUserInfo = async () => {
    if (valid) {
      await fetch("/user/getUserInfo", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          if (data.nickname === null) {
            navigate("/socialSignup", { state: { email: data.email } });
          }
          userId.current = data.id;
          setUserInfo(data);
        });
    }
  };

  useEffect(() => {
    getUserInfo();
  },[valid]);

  return (
    <UserContext.Provider value={{ getUserInfo, userInfo, setUserInfo, validToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
