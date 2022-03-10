import { command } from "../../decorators/command";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";

@command()
export class EightBall extends BaseCommand {
  constructor() {
    super("8ball", {
      description: "command.8ball.desc",
      category: "fun",
      args: true,
      usage: "command.8ball.usage",
      examples: ["Am I cool?", "Will I become rich?"],
    });
  }

  execute({ message, args, __ }: IExecuteArgs) {
    if (args.length < 1) {
      return message.channel.send(__("command.8ball.more_args"));
    }

    const [lastWord] = args.slice(-1);

    if (!lastWord.endsWith("?")) {
      return message.channel.send(__("command.8ball.provide_question"));
    }

    const replies = __("command.8ball.replies").split(",");
    const reply = replies[Math.floor(Math.random() * replies.length)];

    return message.channel.send(reply);
  }
}
