import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Homepage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";

import SidebarNavigation from "./components/layout/SidebarNavigation";
import CatyChatPage from "./pages/CatyChatPage";

function App() {
  
  return (
    
    <div>
      {/* <div><SidebarNavigation/></div> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/userchat" element={<CatyChatPage />} />
        <Route path="/signup" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
