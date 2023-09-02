import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  
  const getUserInfo = async () => {
    await fetch("/user/getUserInfo", { method: "POST"})
    .then((res) => res.json())
    .then((data) => {
      console.log("========", data);
      if (data.nickname === null) {
        navigate("/socialSignup", { state: { email: data.email } });
      }

      setUserInfo(data);
    });
  };

  return (
    <UserContext.Provider value={{ getUserInfo, userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
