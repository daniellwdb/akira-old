import { ApolloError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";
import { IContext } from "../types";

export const isAuthenticated: MiddlewareFn<IContext> = ({ context }, next) => {
  const { session } = context.req;

  if (!session || !session.passport || !session.passport.user) {
    throw new ApolloError("not authenticated");
  }

  return next();
};
