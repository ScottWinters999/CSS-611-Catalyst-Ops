import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const PrivateRoutes = () => {
  const authCtx = useContext(AuthContext);
  
  const tok = JSON.parse(localStorage.getItem("userData"))
  
  // console.log(tok);
  return authCtx.isLoggedIn|| tok?.['token']  ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
