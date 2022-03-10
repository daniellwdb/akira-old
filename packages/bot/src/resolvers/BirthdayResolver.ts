import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { BirthdayConfig } from "../entity/BirthdayConfig";

@Resolver()
export class BirthdayResolver {
  @Query(() => BirthdayConfig, { nullable: true })
  async config(@Arg("guildId") guildId: string) {
    const birthdayConfig = await BirthdayConfig.findOne(guildId);

    return birthdayConfig;
  }

  @Mutation(() => Boolean)
  async deleteBirthdayConfig(@Arg("guildId") guildId: string) {
    const birthdayConfig = await BirthdayConfig.findOne(guildId);

    if (birthdayConfig) {
      await BirthdayConfig.delete(birthdayConfig);
    }

    return true;
  }

  @Mutation(() => Boolean)
  async upsertBirthdayConfig(
    @Arg("guildId") guildId: string,
    @Arg("announceChannelId", { nullable: true }) announceChannelId?: string
  ) {
    const birthdayConfig = await BirthdayConfig.findOne(guildId);

    if (!birthdayConfig) {
      await BirthdayConfig.create({ guildId, announceChannelId }).save();
    } else {
      // @ts-ignore
      birthdayConfig.announceChannelId = !announceChannelId
        ? null
        : announceChannelId;

      await birthdayConfig.save();
    }

    return true;
  }
}
