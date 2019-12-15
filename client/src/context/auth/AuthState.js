import React, { useReducer } from "react";
import { AuthContext } from "./authContext";
import { authReducer } from "./authReducer";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticate: null,
    loading: true,
    error: null,
    user: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //load user

  //register user

  //login user

  //logout

  //clear errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticate: state.isAuthenticate,
        loading: state.loading,
        error: state.error,
        user: state.user
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
