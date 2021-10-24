import React from "react";
import { Redirect, Route } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isUserAuthenticated } = useUserContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        isUserAuthenticated ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
