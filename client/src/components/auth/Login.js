import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AlertContext } from "../../context/alert/alertContext";
import { AuthContext } from "../../context/auth/authContext";

const Login = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { loginUser, error, clearError, isAuthenticate } = authContext;
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      return setAlert("Please add all fields", "danger");
    }
    loginUser({ email, password });
  };

  useEffect(() => {
    if (isAuthenticate) {
      setRedirect(true);
    }
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticate]);
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
          required
        />
      </form>
    </div>
  );
};

export default Login;
