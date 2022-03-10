import enUS from "date-fns/locale/en-US";
import nl from "date-fns/locale/nl";
import { GuildMember, PermissionResolvable, TextChannel } from "discord.js";
import { Registerer } from "../structures/Registerer";

export const noop = () => undefined;

export const entries = Object.entries as <T>(
  o: T
) => [Extract<keyof T, string>, T[keyof T]][];

export const getCommandByName = (name: string) => {
  const command = Registerer.commands.find(
    cmd =>
      cmd.name === name ||
      (cmd.config.aliases && cmd.config.aliases.includes(name))
  );

  return command;
};

export const formatPermission = (permission: PermissionResolvable) => {
  return permission
    .toString()
    .toLowerCase()
    .split("_")
    .map(str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`)
    .join(" ");
};

export const resolveMissingPermissions = (
  channel: TextChannel,
  member: GuildMember,
  requiredPerms: PermissionResolvable[]
) => {
  const permissions = channel.permissionsFor(member);

  if (!permissions) {
    return [];
  }

  return permissions
    .missing(requiredPerms)
    .map(perm => `\`${formatPermission(perm)}\``);
};

export const getLocale = (lang: string) => {
  if (lang === "nl-NL") {
    return nl;
  }

  return enUS;
};
