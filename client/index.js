import React from "react";
import { render } from "react-dom";

// router
import { HashRouter as Router } from "react-router-dom";
import history from "./history";

// child components
import App from "./App";

render(
  <Router history={history}>
    <App />
  </Router>,
  document.querySelector("#root")
);
