import { MessageEmbed } from "discord.js";
import { numericEmojis } from "../../constants/numericEmojis";
import { command } from "../../decorators/command";
import { Question } from "../../entity/Question";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";
import { reactionCollector } from "../../util/collectors";
import { noop } from "../../util/misc";

@command()
export class Poll extends BaseCommand {
  constructor() {
    super("poll", {
      description: "command.poll.desc",
      category: "fun",
      args: true,
      usage: "command.poll.usage",
      examples: [
        "What's the best color?, Red, Green, Blue",
        "What do you prefer?, Driving, Walking, Something else",
      ],
      permissions: ["ADD_REACTIONS", "MANAGE_MESSAGES"],
    });
  }

  async execute({ message, args, __ }: IExecuteArgs) {
    await message.delete().catch(noop);
    const [question, ...answers] = args.join(" ").split(", ");

    if (answers.length < 2 || answers.length > 10) {
      return message.reply(__("command.poll.is_invalid"));
    }

    const prompt = await message.reply(__("command.poll.prompt"));

    const response = await reactionCollector(prompt, message.author.id, [
      "✅",
      "❌",
    ]);

    if (!response) {
      await prompt.delete().catch(noop);

      return message.reply(__("command.poll.no_response"));
    }

    await prompt.delete().catch(noop);

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTitle(question)
      .setDescription(
        answers
          .map((answer, i) => `${[...numericEmojis][i]}: ${answer}`)
          .join("\n")
      );

    const msg = await message.channel.send(embed);
    const [newEmbed] = msg.embeds;
    newEmbed.setFooter(`ID: ${msg.id}`);

    if (response === "✅") {
      newEmbed.setDescription(
        `${newEmbed.description}\n\n${__("command.poll.is_anonymous")}`
      );
    }

    await msg.edit(newEmbed);

    for (const [idx] of answers.entries()) {
      await msg.react(numericEmojis[idx]);
    }

    if (response === "❌") {
      return;
    }

    return await Question.insert({
      authorId: message.author.id,
      messageId: msg.id,
      answerCache: JSON.stringify(answers),
    });
  }
}
