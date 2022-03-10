import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { Commands } from "./pages/Commands";
import { Dashboard } from "./pages/Dashboard";
import { Guild } from "./pages/Guild";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/commands" component={Commands} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/dashboard/:guildId" component={Guild} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
