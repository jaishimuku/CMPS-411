import * as actionTypes from "./actions";
import { combineReducers } from "redux";
import baseURL from "../../src/baseURL";

const initialState = {
  username: null,
  token: null,
  isLoggedIn: false,
};

function login(state, action) {
  console.log("login from reducer is executed");

  let FormData = {
    Username: action.username,
    Password: action.password,
  };

  fetch(`${baseURL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(FormData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Response Ok is false");
      }
    })
    .then((data) => {
      sessionStorage.setItem("userToken", JSON.stringify(data.token));
      state = {
        ...state,
        ...{ username: action.username, token: data.token, isLoggedIn: true },
      };
      console.log("The data is ", state);
    })
    .catch((error) => {
      console.error("error:", error);
    });
  return state;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return login(state, action);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reducer,
});

export default rootReducer;
