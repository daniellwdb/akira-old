import { Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../graphql-types/User";
import { IContext } from "../types";

@Resolver()
export class AuthResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: IContext) {
    if (!req.session || !req.session.passport || !req.session.passport.user) {
      return undefined;
    }

    return req.session.passport.user;
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req }: IContext) {
    req.session?.destroy(() => req.logout());

    return true;
  }
}
