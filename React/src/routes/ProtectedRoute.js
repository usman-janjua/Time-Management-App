import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "../helpers/Tokens";
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const token = getToken();

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        role && token && name ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;
