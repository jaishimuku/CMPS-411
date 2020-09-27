import * as actionTypes from "./actions";
import { combineReducers } from "redux";

const initialState = {
  username: null,
  token: null,
  isAdmin: null,
  firstName: null,
  lastName: null,
  isLoggedIn: false,
  error: null,
  loginMsg: false,
};

function logout(state) {
  sessionStorage.clear("userData");
  state = {
    ...state,
    ...{
      username: null,
      token: null,
      isAdmin: null,
      firstName: null,
      lastName: null,
      isLoggedIn: false,
      loginMsg: false,
    },
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
          firstName: action.firstName,
          lastName: action.lastName,
          isLoggedIn: action.isLoggedIn,
        },
      };
    case actionTypes.LOGIN_FAIL:
      return { ...state, ...{ error: action.error } };
    case actionTypes.SIGN_OUT:
      return logout(state);
    case actionTypes.LOGIN_SUCCESS_MSG:
      return { ...state, ...{ loginMsg: action.show } };
    case actionTypes.ERROR_CLEAR:
      return { ...state, ...{ error: null } };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reducer,
});

export default rootReducer;
