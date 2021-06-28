import React from "react";
import { Route, Redirect } from "react-router-dom";

const Protected = ({ isLoggedIn, children }) => (
  <Route
    render={() =>
      isLoggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

export default Protected;