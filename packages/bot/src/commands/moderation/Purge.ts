import { command } from "../../decorators/command";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";
import { logger } from "../../util/logger";
import { noop } from "../../util/misc";

@command()
export class Purge extends BaseCommand {
  constructor() {
    super("purge", {
      aliases: ["delete", "nuke"],
      description: "command.purge.desc",
      category: "moderation",
      args: true,
      usage: "command.purge.usage",
      examples: ["50", "100"],
      permissions: ["MANAGE_MESSAGES", "READ_MESSAGE_HISTORY"],
    });
  }

  async execute({ message, args: [amount], __ }: IExecuteArgs) {
    let limit = Number(amount) + 1;

    if (isNaN(limit)) {
      return message.channel.send(__("command.purge.not_a_number"));
    }

    if (limit > 100) {
      limit = 100;
    }

    try {
      const messageCollection = await message.channel.messages.fetch({ limit });
      const messages = await message.channel.bulkDelete(
        messageCollection.filter(m => !m.pinned),
        true
      );
      const response = await message.channel.send(
        __("command.purge.success", { amount, size: messages.size - 1 })
      );

      response.delete({ timeout: 5000 }).catch(noop);
    } catch (error) {
      logger.error(error);
    }

    return true;
  }
}
