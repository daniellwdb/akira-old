import { command } from "../../decorators/command";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";

@command()
export class Ping extends BaseCommand {
  constructor() {
    super("ping", {
      description: "command.ping.desc",
      category: "general",
    });
  }

  execute({ message }: IExecuteArgs) {
    message.channel.send("🏓 Pong!");
  }
}
