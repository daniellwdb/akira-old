import { guildConfigSchema } from "@akira/common";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Guild } from "../entity/Guild";
import { FieldError } from "../graphql-types/FieldError";
import { GuildCommandInput } from "../graphql-types/GuildCommandInput";
import { GuildInput } from "../graphql-types/GuildInput";
import { GuildMember } from "../graphql-types/GuildMember";
import { GuildResponse } from "../graphql-types/GuildResponse";
import { Role } from "../graphql-types/Role";
import { TextChannel } from "../graphql-types/TextChannel";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { IContext } from "../types";
import { entries } from "../util/misc";

@ObjectType()
class GuildWithExtras extends Guild {
  @Field(() => [TextChannel])
  channels: TextChannel[];

  @Field(() => [Role])
  roles: Role[];

  @Field(() => [GuildMember])
  members: GuildMember[];
}

@Resolver()
export class GuildResolver {
  @Query(() => [String])
  @UseMiddleware(isAuthenticated)
  guilds(@Ctx() { client }: IContext) {
    return [...client.guilds.keys()];
  }

  @Query(() => GuildWithExtras, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async guild(
    @Arg("guildId") guildId: string,
    @Ctx() { req, client }: IContext
  ) {
    const guild = client.guilds.get(guildId);

    if (!guild) {
      return undefined;
    }

    const member = await guild.members.fetch(req.session!.passport.user.id);

    if (!member || !member.permissions.has("MANAGE_GUILD")) {
      return undefined;
    }

    const prefix = guild.get("prefix");
    const language = guild.get("language");
    const disabledCommands = guild.get("disabledCommands");
    const welcomeMessage = guild.get("welcomeMessage");
    const welcomeChannelId = guild.get("welcomeChannelId");
    const welcomeRoleId = guild.get("welcomeRoleId");
    const preferDM = guild.get("preferDM");
    const leaveMessage = guild.get("leaveMessage");
    const leaveChannelId = guild.get("leaveChannelId");

    const channels = guild.channels
      .filter(c => c.type === "text")
      .map(channel => ({ id: channel.id, name: channel.name }));

    const roles = guild.roles
      .filter(r => r.name !== "@everyone")
      .map(role => ({ id: role.id, name: role.name }));

    const members = await guild.members.fetch();

    return {
      prefix,
      language,
      disabledCommands,
      welcomeMessage,
      welcomeChannelId,
      welcomeRoleId,
      preferDM,
      leaveMessage,
      leaveChannelId,
      channels,
      roles,
      members: members.map(member => ({
        id: member.id,
        name: `${member.displayName} (${member.user.tag})`,
      })),
    };
  }

  @Mutation(() => GuildResponse)
  @UseMiddleware(isAuthenticated)
  async updateGuild(
    @Arg("input") { guildId, ...settings }: GuildInput,
    @Ctx() { req, client }: IContext
  ) {
    const guild = client.guilds.get(guildId);
    const errors: FieldError[] = [];

    if (!guild) {
      errors.push({ path: "guild", message: "cannot find guild" });
    }

    const member = await guild?.members.fetch(req.session!.passport.user.id);

    if (!member || !member.permissions.has("MANAGE_GUILD")) {
      errors.push({
        path: "member",
        message: "you are not inside this guild or missing permissions",
      });
    }

    try {
      await guildConfigSchema.validate({ ...settings }, { abortEarly: false });
    } catch (error) {
      error.inner.forEach(({ ...err }: FieldError) => errors.push(err));
    }

    if (errors.length) {
      return errors;
    }

    const guildSettings = await guild!.getAll();

    for (const [key, val] of entries(settings)) {
      if (guildSettings[key] !== val) {
        await guild!.set(key, val);
      }
    }

    return { ...settings };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async toggleCommand(
    @Arg("input") { guildId, commandName }: GuildCommandInput,
    @Ctx() { client }: IContext
  ) {
    const guild = client.guilds.get(guildId);

    if (!guild) {
      return false;
    }

    await guild.set("disabledCommands", commandName);

    return true;
  }
}
