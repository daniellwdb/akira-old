import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Presence } from "../entity/Presence";

@Resolver()
export class PresenceResolver {
  @Query(() => [Presence])
  async presences(@Arg("guildId") guildId: string) {
    const presences = await Presence.find({ where: { guildId } });

    return presences;
  }

  @Mutation(() => Boolean)
  async deletePresence(@Arg("presenceId") presenceId: string) {
    await Presence.delete(presenceId);

    return true;
  }
}
