import baseURL from "../../src/baseURL";
import { loginSuccessMsg } from "./actions";

export const STORE_CREDS = "STORE_CREDS";
export const SIGN_OUT = "SIGN_OUT";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const ERROR_CLEAR = "ERROR_CLEAR";
export const LOGIN_SUCCESS_MSG = "LOGIN_SUCCESS_MSG";

export function loginAction(
  username,
  token,
  isAdmin,
  firstName,
  lastName,
  isLoggedIn
) {
  return {
    type: STORE_CREDS,
    username,
    token,
    isAdmin,
    firstName,
    lastName,
    isLoggedIn,
  };
}

export function loginFail(error) {
  return {
    type: LOGIN_FAIL,
    error,
  };
}

export function logoutAction() {
  return {
    type: SIGN_OUT,
  };
}

export function loginMsg(show) {
  return {
    type: LOGIN_SUCCESS_MSG,
    show,
  };
}

export function setErrorToNull() {
  return {
    type: ERROR_CLEAR,
  };
}

export function loginThunk(username, password) {
  return function (dispatch) {
    return fetch(`${baseURL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Username: username, Password: password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          //dispatch(loginFail("Error status::: ", response.status));
          console.log("Response not okay", response.status);
        }
      })
      .then((json) => {
        dispatch(
          loginAction(
            username,
            json.token,
            json.isAdmin,
            json.firstName,
            json.lastName,
            true
          )
        );

        sessionStorage.setItem("username", JSON.stringify(username));

        dispatch(loginMsg(true));
      })
      .catch((error) => {
        dispatch(loginFail("Login Error."));
        console.error("error from login ::", error);
      });
  };
}
