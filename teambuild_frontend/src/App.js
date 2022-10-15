import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Homepage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";

import SidebarNavigation from "./components/layout/SidebarNavigation";
import CatyChatPage from "./pages/CatyChatPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import UserPartnerSearchPage from "./pages/UserPartnerSearchPage";

function App() {
  return (
    <div>
      {/* <div>
        <SidebarNavigation />
      </div> */}
      <Routes>
        {/* <SidebarNavigation /> */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/userchat" element={<CatyChatPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/userdashboard" element={<UserDashboardPage />} />
        <Route path="/profilesearch" element={<UserPartnerSearchPage />} />
      </Routes>
      </div>
  );
}

export default App;
