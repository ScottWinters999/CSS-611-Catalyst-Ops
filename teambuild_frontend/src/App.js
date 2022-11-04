import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Homepage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";

import CatyChatPage from "./pages/CatyChatPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import UserPartnerSearchPage from "./pages/UserPartnerSearchPage";
import { AuthContext } from "./shared/context/auth-context";
import React from "react";
import { useAuth } from "./hooks/auth-hook";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PrivateRoutes from "./shared/util/PrivateRoute";
import UserProfileViewsPage from "./pages/UserProfileViewsPage";
import { UserContextProvider } from "./shared/context/user-context";

function App() {
  const { token, login, logout } = useAuth();

  let routes;

  // if (token) {
  //   console.log(token)
  //   routes = (
  //     <Routes>
  //       <Route path="/userchat" element={<CatyChatPage />} />
  //       <Route path="/userdashboard" element={<UserDashboardPage />} />
  //       <Route path="/profilesearch" element={<UserPartnerSearchPage />} />
  //       <Route path="/" element={<Homepage />} />
  //       <Route path="*" element={<Navigate to="/" replace />} />
  //     </Routes>
  //   );
  // } else {
  //   routes = (
  //     <Routes>
  //       <Route path="/" element={<Homepage />} />
  //       <Route path="/login" element={<SignIn />} />
  //       <Route path="/signup" element={<AuthPage />} />
  //       <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
  //       <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
  //       <Route path="*" element={<Navigate to="/" replace />} />
  //     </Routes>
  //   );
  // }


    routes = (
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/userchat" element={<CatyChatPage />} />
          <Route path="/userdashboard" element={<UserDashboardPage />} />
          <Route path="/profilesearch" element={<UserPartnerSearchPage />} />
          <Route path="/profileviews" element={<UserProfileViewsPage />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  

  return (
    <div>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          login: login,
          logout: logout,
        }}
      >
        <React.Fragment>{routes}</React.Fragment>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
