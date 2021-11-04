import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./containers/Dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact component={SignIn} path="/" />
          <Route exact component={SignUp} path="/sign-up" />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <Route exact component={PageNotFound} path="*" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
