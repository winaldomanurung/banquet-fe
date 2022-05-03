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
import PasswordForget from "./pages/PasswordForget";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import axios from "axios";
import { URL_API } from "./helpers";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.token);

  // axios
  //   .get(URL_API + "/users/retrieve-data", {
  //     headers: {
  //       "Auth-Token": authCtx.token,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<PasswordForget />} />
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

// import "./App.css";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import HeroSection from "./components/HeroSection";
// import NavigationBar from "./components/NavigationBar";
// import Restaurants from "./pages/Restaurants";
// import About from "./components/About";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Verification from "./pages/Verification";
// import Profile from "./pages/Profile";
// import PasswordReset from "./pages/PasswordReset";
// import PasswordForget from "./pages/PasswordForget";
// import { useContext } from "react";
// import AuthContext from "./store/auth-context";

// function App() {
//   const authCtx = useContext(AuthContext);
//   console.log(authCtx.isLoggedIn);
//   return (
//     <BrowserRouter>
//       <NavigationBar />
//       <Routes>
//         <Route path="/" element={<HeroSection />} />
//         <Route path="/restaurants" element={<Restaurants />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/authentication/:token" element={<Verification />} />
//         <Route path="/reset-password/:token" element={<PasswordReset />} />
//         <Route path="/forget-password" element={<PasswordForget />} />

//         {/* Path untuk non logged in user */}
//         {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
//         {!authCtx.isLoggedIn && (
//           <Route path="/register" element={<Register />} />
//         )}

//         {/* Path untuk logged in user */}
//         <Route
//           path="/profile/*"
//           element={
//             authCtx.isLoggedIn ? <Profile /> : <Navigate to="/login" replace />
//           }
//         />

//         <Route path="*" element={<Navigate to="/profile" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
