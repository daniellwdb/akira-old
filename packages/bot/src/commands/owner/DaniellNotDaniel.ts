import { command } from "../../decorators/command";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";

@command()
export class Dan extends BaseCommand {
  constructor() {
    super("daniellnotdaniel", {
      description: "This is a private command",
      category: "owner",
    });
  }

  async execute({ message }: IExecuteArgs) {
    message.channel.send("https://imgur.com/a/dh1wKo2");
  }
}
