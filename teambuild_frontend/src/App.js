import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/login" element={<SignIn />}/>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
    </div>
  );
}

export default App;
