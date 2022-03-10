import { MessageEmbed } from "discord.js";
import { command } from "../../decorators/command";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";

@command()
export class Overview extends BaseCommand {
  constructor() {
    super("overview", {
      description: "Show information about Akira",
      category: "owner",
    });
  }

  async execute({ message }: IExecuteArgs) {
    const client = message.client;

    const memberCount = client.guilds.reduce(
      (acc, val) => val.memberCount + acc,
      0
    );

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .addField("Members", `Serving ${memberCount} members`)
      .addField("Guilds", `Operating in ${client.guilds.size} servers`);

    message.channel.send(embed);
  }
}
