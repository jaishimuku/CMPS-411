import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import rootReducer from "./module/reducers";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    {" "}
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
