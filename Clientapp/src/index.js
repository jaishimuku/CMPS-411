import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import rootReducer from "./module/reducers";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
// const store = createStore(
//   rootReducer,
//   persistedState,
//   composeEnhancers(applyMiddleware(thunkMiddleware))
// );

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunkMiddleware)
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    {" "}
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
