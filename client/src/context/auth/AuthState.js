import React, { useReducer } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";
import { authReducer } from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../types";
import { setAuthToken } from "../../utils/setAuthToken";

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

  const loadUser = async () => {
    //load token into global headers
    const token = localStorage.getItem("token");
    setAuthToken(token);
    try {
      const response = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: response.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  //register user
  const register = async formData => {
    try {
      const response = await axios.post("/api/users", formData);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.error });
    }
  };

  //login user

  const loginUser = async formData => {
    try {
      const response = await axios.post("/api/auth", formData);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });
    }
  };

  //logout

  const logOut = () => dispatch({ type: LOGOUT });

  //clear errors

  const clearError = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticate: state.isAuthenticate,
        loading: state.loading,
        error: state.error,
        user: state.user,
        register,
        loadUser,
        logOut,
        loginUser,
        clearError
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
