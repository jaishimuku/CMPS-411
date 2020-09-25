import * as actionTypes from "./actions";
import { combineReducers } from "redux";

const initialState = {
  username: null,
  token: null,
  isAdmin: false,
  isLoggedIn: false,
};

function logout(state) {
  sessionStorage.clear("userData");
  state = {
    ...state,
    ...{ username: null, token: null, isAdmin: false, isLoggedIn: false },
  };
  return state;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_CREDS:
      return {
        ...state,
        ...{
          username: action.username,
          token: action.token,
          isAdmin: action.isAdmin,
          isLoggedIn: action.isLoggedIn,
        },
      };
    case actionTypes.SIGN_OUT:
      return logout(state);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reducer,
});

export default rootReducer;
