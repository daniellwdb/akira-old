import { MessageAttachment } from "discord.js";
import fetch from "node-fetch";
import { command } from "../../decorators/command";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";
import { reactionCollector } from "../../util/collectors";
import { logger } from "../../util/logger";
import { noop } from "../../util/misc";

@command()
export class Panda extends BaseCommand {
  constructor() {
    super("panda", {
      description: "command.panda.desc",
      category: "fun",
      permissions: ["ATTACH_FILES", "ADD_REACTIONS"],
    });
  }

  async execute({ message, __ }: IExecuteArgs) {
    const prompt = await message.channel.send(__("command.panda.prompt"));

    const reaction = await reactionCollector(prompt, message.author.id, [
      "🐼",
      "❓",
    ]);

    if (!reaction) {
      message.reply(__("error.no_response"));

      return prompt.delete().catch(noop);
    }

    try {
      if (reaction === "🐼") {
        const { link } = await fetch(
          "https://some-random-api.ml/img/panda"
        ).then(res => res.json());

        await message.channel.send(new MessageAttachment(link));
      } else {
        const { fact } = await fetch(
          "https://some-random-api.ml/facts/panda"
        ).then(res => res.json());

        await message.channel.send(`*"${fact}"*`);
      }
    } catch (error) {
      logger.error(error);
    }

    return prompt.delete().catch(noop);
  }
}
