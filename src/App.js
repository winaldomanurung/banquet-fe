import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import HeroSection from "./components/HeroSection";
import NavigationBar from "./components/NavigationBar";
import Restaurants from "./pages/Restaurants";
import MyRestaurants from "./pages/MyRestaurants.js";
import About from "./components/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import Profile from "./pages/Profile";
import PasswordReset from "./pages/PasswordReset";
import PasswordForget from "./pages/PasswordForget";
import AuthContext from "./store/auth-context";
import AddRestaurant from "./pages/AddRestaurant";
import RestaurantDetail from "./pages/RestaurantDetail";
import EditRestaurant from "./pages/EditRestaurant";
import axios from "axios";
import { URL_API } from "./helpers";

import { authLogin } from "./actions";
import { connect } from "react-redux";

function App(props) {
  // Digunakan untuk melakukan pengecekan token, apakah user sudah login
  const authCtx = useContext(AuthContext);

  // Untuk mengambil data user yang sedang login
  axios
    .get(URL_API + "/users/retrieve-data", {
      headers: {
        "Auth-Token": authCtx.token,
      },
    })
    .then((res) => {
      // console.log(res.data);
      props.authLogin(res.data.dataUser);
    })
    .catch((err) => {
      // console.log(err);
      return;
    });

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/:userId/my-restaurants" element={<MyRestaurants />} />
        <Route
          path="/:userId/restaurants/:restaurantId/edit"
          element={<EditRestaurant />}
        />
        <Route
          path="/:userId/restaurants/:restaurantId"
          element={<RestaurantDetail />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/:userId/add-restaurant" element={<AddRestaurant />} />

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

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    username: state.authReducer.username,
    fullname: state.authReducer.fullname,
    email: state.authReducer.email,
    isVerified: state.authReducer.isVerified,
    bio: state.authReducer.bio,
    imageUrl: state.authReducer.imageUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (dataLogin) => dispatch(authLogin(dataLogin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
