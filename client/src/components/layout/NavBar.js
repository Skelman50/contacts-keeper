import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";
import { ContactContext } from "../../context/contact/contactContext";

const NavBar = ({ title = "Contact Keeper", icon = "fas fa-id-card-alt" }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { clearContacts } = contactContext;

  const { isAuthenticate, user, logOut } = authContext;

  const onLogout = () => {
    logOut();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>Hello {user && user.name}</li>
      <li onClick={onLogout}>
        <Link to="#">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </Fragment>
  );

  const questLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticate ? authLinks : questLinks}</ul>
    </div>
  );
};

export default NavBar;
