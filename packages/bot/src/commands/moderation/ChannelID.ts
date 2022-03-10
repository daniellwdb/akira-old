import { command } from "../../decorators/command";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";

@command()
export class ChannelID extends BaseCommand {
  constructor() {
    super("channelid", {
      aliases: ["cid"],
      description: "command.channelid.desc",
      category: "moderation",
      usage: "command.channelid.usage",
    });
  }

  execute({ message, __ }: IExecuteArgs) {
    const channel = message.mentions.channels.first();

    if (channel) {
      return message.channel.send(
        __("command.channelid.success", { channel, id: channel.id })
      );
    }

    return message.channel.send(
      __("command.channelid.success", {
        channel: message.channel,
        id: message.channel.id,
      })
    );
  }
}
