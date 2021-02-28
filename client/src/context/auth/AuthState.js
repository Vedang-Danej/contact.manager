import { useReducer } from "react";
import axios from "axios";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import setAuthToken from "../../utils/setTokenAuth";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";
const ContactState = (props) => {
  const initialState = {
    user: null,
    loading: true,
    isAuthenticated: null,
    token: localStorage.getItem("token"),
    errors: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  const loadUser = async () => {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
    loadUser();
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
    loadUser();
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        lodaing: state.loading,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        errors: state.errors,
        clearErrors,
        register,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default ContactState;
