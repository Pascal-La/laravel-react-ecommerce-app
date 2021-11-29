import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import axios from "axios";

import AdminPrivateRoute from "./AdminPrivateRoute";
import PublicRoute from "./PublicRoute";

import Register from "./components/frontend/auth/Register";
import Login from "./components/frontend/auth/Login";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AdminPrivateRoute path="/admin" name="Admin" />
          <PublicRoute path="/" name="Home" />
          <Route path="/login">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/register">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <Register />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
