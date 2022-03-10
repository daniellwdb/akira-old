import { MessageEmbed } from "discord.js";
import { command } from "../../decorators/command";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";
import { noop } from "../../util/misc";

const isPromise = (value: any) => {
  return (
    value &&
    typeof value.then === "function" &&
    typeof value.catch === "function"
  );
};

@command()
export class Eval extends BaseCommand {
  constructor() {
    super("eval", {
      description: "Execute code",
      category: "owner",
    });
  }

  async execute({ message, args }: IExecuteArgs) {
    await message.delete().catch(noop);
    await message.guild!.members.fetch();

    try {
      const codein = args.join(" ");
      let code = eval(codein);

      if (isPromise(code)) {
        code = await code;
      }

      const ctype = typeof code;

      if (typeof code !== "string") {
        code = require("util").inspect(code, {
          depth: 0,
        });
      }

      message.channel.send(
        new MessageEmbed()
          .setTitle("Daniell's code snippet")
          .addField("Input", `\`\`\`js\n${codein}\`\`\``)
          .addField("Output", `\`\`\`js\n${code}\`\`\``)
          .addField("Type", `\`\`\`js\n${ctype}\`\`\``)
      );
    } catch (e) {
      message.channel.send(
        new MessageEmbed()
          .setTitle("Error")
          .setColor("#ff0000")
          .addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
          .addField("Error", `\`\`\`js\n${e.name}: ${e.message}\`\`\``)
      );
    }
  }
}
