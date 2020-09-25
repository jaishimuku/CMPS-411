import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import rootReducer from "./module/reducers";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    {" "}
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
