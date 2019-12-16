import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS
} from "../types";

export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticate: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticate: null,
        loading: false,
        user: null,
        error: payload
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticate: true,
        loading: false,
        user: payload
      };
    default:
      return state;
  }
};
