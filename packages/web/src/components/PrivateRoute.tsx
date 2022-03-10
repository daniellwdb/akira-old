import React, { ComponentType } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { Layout } from "./Layout";

interface IPrivateRouteProps {
  component: ComponentType<unknown>;
}

export const PrivateRoute = ({
  component: Component,
  ...rest
}: RouteProps & IPrivateRouteProps) => {
  const { data, loading } = useMeQuery();

  if (loading || !data) {
    return <Layout />;
  }

  return (
    <Route
      {...rest}
      render={props =>
        data.me ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
