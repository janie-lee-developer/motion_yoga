import React, { Component } from "react";

//router
import { Route, Switch, Redirect } from "react-router-dom";

// child components
import Home from "./Components/Home";
import Start from "./Model/model_deploy";
// import Start from "./Model/model_collection_1";
// import Start from "./Model/model_training_2";
import About from "./Components/About";
import PageNotFound from "./Components/PageNotFound";

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/start" component={Start} />
          <Route path="/about" component={About} />
          <Route path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </div>
    );
  }
}

export default Routes;
