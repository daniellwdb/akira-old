import { MessageEmbed } from "discord.js";
import { command } from "../../decorators/command";
import { BaseCommand } from "../../structures/BaseCommand";
import { Registerer } from "../../structures/Registerer";
import { ICommand, IExecuteArgs } from "../../types";
import { formatPermission, getCommandByName } from "../../util/misc";

interface ICommandAcc {
  commands: ICommand[];
  category: string;
}

@command()
export class Help extends BaseCommand {
  constructor() {
    super("help", {
      description: "command.help.desc",
      category: "general",
      permissions: ["EMBED_LINKS"],
    });
  }

  async execute({ ...args }: IExecuteArgs) {
    if (args.args[0]) {
      await this.getCommand({ ...args });
    } else {
      await this.getCommands({ ...args });
    }
  }

  async getCommand({ message, args: [commandName], __ }: IExecuteArgs) {
    const command = getCommandByName(commandName.toLowerCase());

    if (!command) {
      return message.channel.send(
        __("command.help.command_not_found", { commandName })
      );
    }

    if (["owner", "internal"].includes(command.config.category)) {
      return;
    }

    const embed = new MessageEmbed().setColor("BLUE").setTitle(command.name);
    const prefix = await message.guild!.get("prefix");

    if (command.config.aliases) {
      embed.addField(
        __("aliases"),
        command.config.aliases.map(alias => `${alias}`).join(", ")
      );
    }

    embed.addField(__("category"), __(command.config.category));
    embed.addField(__("description"), __(command.config.description));

    if (command.config.usage) {
      embed.addField(
        __("usage"),
        `${prefix}${command.name} ${__(command.config.usage)}`
      );
    }

    if (command.config.examples) {
      embed.addField(
        __("examples"),
        command.config.examples
          .map(example => `${prefix}${command.name} ${example}`)
          .join("\n")
      );
    }

    if (command.config.permissions) {
      embed.addField(
        __("permissions"),
        command.config.permissions
          .map(perm => `${formatPermission(perm)}`)
          .join(", ")
      );
    }

    return message.channel.send(embed);
  }

  async getCommands({ message, __ }: IExecuteArgs) {
    const prefix = await message.guild!.get("prefix");

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(__("command.help.title"))
      .setFooter(__("command.help.footer_text", { prefix }));

    const commands = Registerer.commands
      .filter(cmd => !["owner", "internal"].includes(cmd.config.category))
      .reduce<ICommandAcc[]>((acc, val) => {
        const idx = acc.findIndex(cmd => cmd.category === val.config.category);

        idx > -1
          ? acc[idx].commands.push(val)
          : acc.push({ category: val.config.category, commands: [val] });

        return acc;
      }, []);

    commands.forEach(command => {
      embed.addField(
        `${__(command.category)} (${command.commands.length})`,
        command.commands.map(cmd => `\`${cmd.name}\``).join(", ")
      );
    });

    message.channel.send(embed);
  }
}
