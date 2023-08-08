import axios from "axios";
import { makeRequest } from '../axios';
import { createContext, useEffect, useState } from "react";
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [loginPage, setLoginPage] = useState(false);

  const refreshUser = async (user) => {
    setCurrentUser(user)
  };

  const refreshLogin = async (login) => {
    setLoginPage(login)
  };

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await makeRequest.get("users/get", {
          withCredentials: true,
        })
        setCurrentUser(res.data||null)
        localStorage.setItem("user", JSON.stringify(res.data || null))
      } catch (err) {
        console.log(err)
        setCurrentUser(null)
        localStorage.setItem("user", null)
      }
    };
    fetchUser();
  }, []);


  return (
    <AuthContext.Provider value={{ currentUser, refreshUser,loginPage,refreshLogin}}>
      {children}
    </AuthContext.Provider>
  );
};