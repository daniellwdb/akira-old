import { numericEmojis } from "../../constants/numericEmojis";
import { command } from "../../decorators/command";
import { Question } from "../../entity/Question";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";
import { noop } from "../../util/misc";

@command()
export class EndPoll extends BaseCommand {
  constructor() {
    super("endpoll", {
      description: "command.endpoll.desc",
      category: "fun",
      args: true,
      usage: "command.endpoll.usage",
      examples: ["672865285593890817,672865285593899017", "672865248662913034"],
    });
  }

  async execute({ message, args: [ids], __ }: IExecuteArgs) {
    await message.delete().catch(noop);

    const pollIds = ids.split(",");

    if (pollIds.length > 1) {
      await Promise.all(pollIds.map(id => this.endPoll({ message, __, id })));
    } else {
      await this.endPoll({ message, __, id: pollIds[0] });
    }
  }

  async endPoll({
    message,
    __,
    id,
  }: Omit<IExecuteArgs, "args"> & { id: string }) {
    const msg = await message.channel.messages.fetch(id).catch(noop);

    if (!msg) {
      const reply = await message.reply(
        __("command.endpoll.no_message", { id })
      );

      return reply.delete({ timeout: 7000 }).catch(noop);
    }

    const poll = await Question.findOne({
      where: { messageId: id },
      relations: ["answers"],
    });

    if (!poll) {
      if (msg.embeds.length) {
        const [embed] = msg.embeds;

        if (embed.footer?.text === __("command.endpoll.closed")) {
          return;
        }

        const lines = embed.description.split("\n");
        const answers = lines.map(line => line.split(": ")[1]);

        const results = numericEmojis
          .filter(emoji => msg.reactions.has(emoji))
          .map((emoji, i) => {
            const reaction = msg.reactions.get(emoji);

            return __("command.endpoll.results", {
              answer: answers[i],
              count: `\`${reaction!.count - 1}\``,
            });
          });

        embed.setDescription(results.join("\n"));
        embed.setFooter(__("command.endpoll.closed"));

        await msg.edit(embed);
        return await msg.reactions.removeAll();
      }

      const reply = await message.reply(
        __("command.endpoll.no_message", { id })
      );

      return reply.delete({ timeout: 5000 }).catch(noop);
    }

    if (poll.authorId !== message.author.id) {
      const reply = await message.reply(__("command.endpoll.unauthorized"));

      await reply.delete({ timeout: 5000 }).catch(noop);
    }

    const answers = JSON.parse(poll.answerCache);

    const results = numericEmojis
      .filter(emoji => msg.reactions.has(emoji))
      .map((_, i) => {
        const filtered = poll.answers.filter(answer => answer.index === i);

        return __("command.endpoll.results", {
          answer: answers[i],
          count: `\`${filtered.length}\``,
        });
      });

    const [embed] = msg.embeds;
    embed.setDescription(results.join("\n"));
    embed.setFooter(__("command.endpoll.closed", { tag: message.author.tag }));
    await msg.edit(embed);
    await msg.reactions.removeAll();

    return await Question.delete(poll);
  }
}
