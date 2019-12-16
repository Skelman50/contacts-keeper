import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AlertContext } from "../../context/alert/alertContext";
import { AuthContext } from "../../context/auth/authContext";

const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, error, clearError, isAuthenticate } = authContext;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const [redirect, setRedirect] = useState(false);
  const { name, email, password, passwordConfirm } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (!name || !email || !password) {
      return setAlert("Please add all fields", "danger");
    }
    if (password !== passwordConfirm) {
      return setAlert("Passwords don't match", "danger");
    }

    register({ name, email, password });
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
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
