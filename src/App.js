import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HeroSection from "./components/HeroSection";
import NavigationBar from "./components/NavigationBar";
import Restaurants from "./pages/Restaurants";
import About from "./components/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import Profile from "./pages/Profile";
import PasswordReset from "./pages/PasswordReset";
import PasswordForget from "./pages/PasswordForget";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import axios from "axios";
import { URL_API } from "./helpers";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn);
  console.log("APP REFRESH");

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/about" element={<About />} />

        {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
        {!authCtx.isLoggedIn && (
          <Route path="/register" element={<Register />} />
        )}

        <Route path="/forget-password" element={<PasswordForget />} />

        <Route path="/authentication/:token" element={<Verification />} />
        <Route path="/reset-password/:token" element={<PasswordReset />} />

        {authCtx.isLoggedIn && (
          <Route path="/profile/*" element={<Profile />} />
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
