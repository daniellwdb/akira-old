import { command } from "../../decorators/command";
import { Presence } from "../../entity/Presence";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";
import { reactionCollector } from "../../util/collectors";
import { noop } from "../../util/misc";

@command()
export class SetAFK extends BaseCommand {
  constructor() {
    super("setafk", {
      aliases: ["afk"],
      description: "command.setafk.desc",
      category: "general",
      usage: "command.setafk.usage",
      examples: ["On vacation"],
      permissions: ["ADD_REACTIONS", "READ_MESSAGE_HISTORY"],
    });
  }

  async execute({ message, args, __ }: IExecuteArgs) {
    await message.delete().catch(noop);

    const presenceObj = {
      guildId: message.guild!.id,
      userId: message.author.id,
    };

    const presence = await Presence.findOne({ ...presenceObj });
    const role = message.guild!.roles.find(r => r.name.toLowerCase() === "afk");
    const member = await message.guild!.members.fetch(message.author.id);

    if (presence) {
      if (role && member.roles.has(role.id)) {
        try {
          await member.roles.remove(role);
        } catch (error) {
          message.channel.send(
            __("command.setafk.missing_role_perms", { user: message.author })
          );
        }
      }

      await Presence.delete({ ...presenceObj });

      return message.channel.send(
        __("command.setafk.welcome_back", { user: message.author })
      );
    }

    if (!args.length) {
      return message.reply(__("command.setafk.no_args"));
    }

    const prompt = await message.channel.send(__("command.setafk.prompt"));

    const response = await reactionCollector(prompt, message.author.id, [
      "✅",
      "❌",
    ]);

    if (!response) {
      await prompt.delete().catch(noop);

      return message.reply(__("command.setafk.no_response"));
    }

    await prompt.delete().catch(noop);

    await Presence.insert({
      ...presenceObj,
      status: args.join(" "),
      showStatusOnMention: response === "✅",
    });

    if (role) {
      try {
        await member.roles.add(role);
      } catch (error) {
        message.channel.send(
          __("command.setafk.missing_role_perms", { user: message.author })
        );
      }
    }

    return message.reply(__("command.setafk.success"));
  }
}
