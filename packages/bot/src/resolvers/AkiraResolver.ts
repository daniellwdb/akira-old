import { Ctx, Query, Resolver } from "type-graphql";
import { Command } from "../entity/Command";
import { CommandCategory } from "../graphql-types/CommandCategory";
import { Registerer } from "../structures/Registerer";
import { ICommand, ICommandConfig, IContext } from "../types";
import { formatPermission } from "../util/misc";
import { setLanguage } from "../util/translate";

interface ICommandAcc {
  category: string;
  commands: ICommand[];
}

@Resolver()
export class AkiraResolver {
  @Query(() => String)
  hello(@Ctx() { client }: IContext) {
    return `${client.user!.username} says hello!`;
  }

  @Query(() => [Command])
  async commands() {
    const commands = await Command.find();

    const ownerCommands = Registerer.commands.filter(cmd =>
      ["owner", "internal"].includes(cmd.config.category)
    );

    const isOwnerCommand = (commandName: string) =>
      ownerCommands.some(
        cmd =>
          cmd.name === commandName &&
          ["owner", "internal"].includes(cmd.config.category)
      );

    return commands.filter(cmd => !isOwnerCommand(cmd.name));
  }

  @Query(() => [CommandCategory])
  commandCategories() {
    const __ = setLanguage("en-US");

    const commands = Registerer.commands
      .filter(cmd => !["owner", "internal"].includes(cmd.config.category))
      .reduce<ICommandAcc[]>((acc, val) => {
        const idx = acc.findIndex(
          cmd => cmd.category === __(val.config.category)
        );

        const translatedValues = {
          description: __(val.config.description),
          usage: val.config.usage ? __(val.config.usage) : undefined,
          permissions:
            val.config.permissions &&
            (val.config.permissions.map(perm =>
              formatPermission(perm)
            ) as ICommandConfig["permissions"]),
        };

        const currentCommand = {
          ...val,
          config: { ...val.config, ...translatedValues },
        };

        idx > -1
          ? acc[idx].commands.push(currentCommand)
          : acc.push({
              category: __(val.config.category),
              commands: [currentCommand],
            });

        return acc;
      }, []);

    return commands;
  }
}
