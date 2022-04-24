import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeroSection from "./components/HeroSection";
import NavigationBar from "./components/NavigationBar";
import Restaurants from "./components/Restaurants";
import About from "./components/About";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
