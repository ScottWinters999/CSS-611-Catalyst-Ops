import { useState,useCallback,useEffect } from "react";
import { useNavigate } from "react-router-dom";

let logoutTimer;
export const useAuth = () => {

  // const initialStoredData = JSON.parse(localStorage.getItem("userData"));
  // console.log(initialStoredData)
  
  const [token, setToken] = useState(false);
  // if(initialStoredData){
  //   setToken(initialStoredData.token)
  // }
  
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  
  const login = useCallback((token, expirationDate) => {
    setToken(token);
    console.log(token,'token')
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    // let x = atob(token)
    // console.log(x,24)
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("firstName");
    localStorage.removeItem("userId");

    localStorage.removeItem("chat_session")
  }, []);

 

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    console.log(storedData)
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      console.log(remainingTime);
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return{token, login, logout};
};
