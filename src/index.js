import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Reducers } from "./reducers";
import { AuthContextProvider } from "./store/auth-context";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl";

const storeReducer = createStore(Reducers);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <Provider store={storeReducer}>
      <App />
    </Provider>
  </AuthContextProvider>
);
