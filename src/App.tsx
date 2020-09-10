import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import DisqualificationPage from "./components/DisqualificationPage";
import LandingPage from "./components/LandingPage";
import NewAccountPage from "./components/NewAccountPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/disqualified">
          <DisqualificationPage />
        </Route>
        <Route path="/qualified">
          <NewAccountPage />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
