import { command } from "../../decorators/command";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";

@command()
export class Avatar extends BaseCommand {
  constructor() {
    super("avatar", {
      aliases: ["pf"],
      description: "command.avatar.desc",
      category: "fun",
      usage: "command.avatar.usage",
      examples: ["@Akira"],
      permissions: ["ATTACH_FILES"],
    });
  }

  execute({ message, __ }: IExecuteArgs) {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `${__("command.avatar.reply")} <${message.author.displayAvatarURL({
          format: "png",
          size: 2048,
        })}>`
      );
    }

    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: ${user.displayAvatarURL({
        format: "png",
        size: 2048,
      })}`;
    });

    return message.channel.send(avatarList);
  }
}
