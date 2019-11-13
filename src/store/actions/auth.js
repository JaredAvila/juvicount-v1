import * as actionTypes from "./actionTypes";
import axios from "axios";

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationTime");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
    email
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const data = {
      email,
      password,
      returnSecureToken: true
    };
    let url = "http://localhost:8000/api/v1/juvicount/register";
    if (!isSignUp) {
      url = "http://localhost:8000/api/v1/juvicount/login";
    }
    axios
      .post(url, data)
      .then(res => {
        const expirationTime = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("expirationTime", expirationTime);
        dispatch(authSuccess(res.data.idToken, res.data.id, res.data.email));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};
