import baseURL from "../../src/baseURL";

export const STORE_CREDS = "STORE_CREDS";
export const SIGN_OUT = "SIGN_OUT";

export function loginAction(username, token, isAdmin, isLoggedIn) {
  return {
    type: STORE_CREDS,
    username,
    token,
    isAdmin,
    isLoggedIn,
  };
}

export function logoutAction() {
  return {
    type: SIGN_OUT,
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
          console.log("Response not okay");
        }
      })
      .then((json) => {
        dispatch(loginAction(username, json.token, json.isAdmin, true));
        sessionStorage.setItem("userToken", JSON.stringify(json.token));
      })
      .catch((error) => {
        console.error("error from login ::", error);
      });
  };
}
