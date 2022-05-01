import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeroSection from "./components/HeroSection";
import NavigationBar from "./components/NavigationBar";
import Restaurants from "./pages/Restaurants";
import About from "./components/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import Profile from "./pages/Profile";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Menjalankan request ke API kita untuk patch dengan routing /verify*/}
        <Route path="/authentication/:token" element={<Verification />} />
        <Route path="/reset-password/:token" element={<PasswordReset />} />
        <Route path="/profile/*" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
