import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./context/alert/AlertState";
import Alert from "./components/layout/Alert";
import { setAuthToken } from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

const token = localStorage.getItem("token");
setAuthToken(token);

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <NavBar />
            <div className="container">
              <Alert />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
