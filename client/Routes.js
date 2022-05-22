import React, { Component } from "react";

// router
import { Route, Switch, Redirect } from "react-router-dom";

// child components
import Home from "./Components/Home";
import About from "./Components/About";
import PageNotFound from "./Components/PageNotFound";
import Start from "./Model/model_deploy";
// switch to below for data collecting and training:
// import Start from "./Model/model_collection_1";
// import Start from "./Model/model_training_2";

// MUI
import { Box } from "@mui/material";

class Routes extends Component {
  render() {
    return (
      <Box>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/start" component={Start} />
          <Route path="/about" component={About} />
          <Route path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </Box>
    );
  }
}

export default Routes;
