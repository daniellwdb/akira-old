import { MessageEmbed, TextChannel } from "discord.js";
import { command } from "../../decorators/command";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";

@command()
export class Suggest extends BaseCommand {
  constructor() {
    super("suggest", {
      aliases: ["suggestion"],
      description: "command.suggest.desc",
      category: "general",
      usage: "command.suggest.usage",
      args: true,
      examples: [
        "Restrict commands to specific roles",
        "Allow me to look up a song",
      ],
    });
  }

  execute({ message, args, __ }: IExecuteArgs) {
    if (args.length < 10) {
      return message.channel.send(__("command.suggest.fail"));
    }

    const channel = message.client.channels.get(
      process.env.SUGGESTION_CHANNEL!
    ) as TextChannel;

    if (!channel) {
      throw Error("Couldn't find channel for suggestions");
    }

    const embed = new MessageEmbed()
      .setTitle("New suggestion")
      .setColor("BLUE")
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`**${args.join(" ")}**`)
      .setTimestamp();

    channel.send(embed);

    return message.channel.send(__("command.suggest.success"));
  }
}
