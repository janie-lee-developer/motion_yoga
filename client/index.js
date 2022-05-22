import React from "react";
import { render } from "react-dom";

// router
import { HashRouter as Router } from "react-router-dom";

// child components
import App from "./App";

render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#root")
);
