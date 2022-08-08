/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import store from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HashRouter basename="/">
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
