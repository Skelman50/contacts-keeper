import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../layout/NavBar";
import Alert from "../layout/Alert";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import About from "../pages/About";
import Register from "../auth/Register";
import Login from "../auth/Login";
import { AuthContext } from "../../context/auth/authContext";

const Routers = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
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
  );
};

export default Routers;
