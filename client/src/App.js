import React from "react";
import "./App.css";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import { setAuthToken } from "./utils/setAuthToken";
import Routers from "./components/routing/Routers";

const token = localStorage.getItem("token");
setAuthToken(token);

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Routers />
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
