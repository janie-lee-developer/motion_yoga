import React, { Component } from "react";

// router
import { Route, Switch, Redirect } from "react-router-dom";

// child components
import Navbar from "./Components/Navbar";

// MUI
import { Box } from "@mui/material";

class NavbarRoutes extends Component {
  render() {
    return (
      <Box>
        <Switch>
          <Route exact path="/" render={(routeProps) => <Navbar routeProps={routeProps} />} />
          <Route path="/home" render={(routeProps) => <Navbar routeProps={routeProps} />} />
          <Route path="/start" render={(routeProps) => <Navbar routeProps={routeProps} />} />
          <Redirect to="/" />
        </Switch>
      </Box>
    );
  }
}

export default NavbarRoutes;
