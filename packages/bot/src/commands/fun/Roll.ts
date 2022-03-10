import { Message, MessageEmbed, MessageReaction, User } from "discord.js";
import { command } from "../../decorators/command";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";
import { noop } from "../../util/misc";

@command()
export class Roll extends BaseCommand {
  private rolls = 0;
  private total = 0;
  private isPlaying = false;
  private history = "";

  constructor() {
    super("roll", {
      description: "command.roll.desc",
      category: "fun",
      permissions: ["ADD_REACTIONS"],
    });
  }

  async execute({ message, __ }: IExecuteArgs) {
    if (!message.guild?.me?.permissions.has("MANAGE_MESSAGES")) {
      return;
    }

    if (this.isPlaying) {
      return message.reply(__("command.roll.busy"));
    }

    this.isPlaying = true;

    await message.delete().catch(noop);

    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setFooter(
        __("command.roll.quote"),
        message.client.user?.displayAvatarURL()
      );

    const msg = await message.channel.send(embed);
    await msg.react("🎲");
    await msg.react("❌");

    const filter = (reaction: MessageReaction, user: User) => {
      return (
        ["🎲", "❌"].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };

    const collector = msg.createReactionCollector(filter, {
      time: 300000,
      max: 5,
    });

    collector.on("collect", async reaction => {
      if (reaction.emoji.name === "🎲") {
        await this.update(msg, message.author.id, __);
      } else {
        this.stop(msg);
      }
    });

    collector.on("end", () => this.stop(msg));

    return true;
  }

  private roll() {
    return Math.floor(Math.random() * 6) + 1;
  }

  private async update(
    message: Message,
    userId: string,
    __: (key: string, placeholders?: object) => string
  ) {
    await message.reactions
      .find(r => r.users.has(userId))
      ?.users.remove(userId);

    const [embed] = message.embeds;
    const roll = this.roll();

    this.rolls++;
    this.total = this.total + roll;
    this.history += `${this.rolls}: ${"🎲".repeat(roll)} (${roll})\n`;

    embed.setDescription(
      `${this.history}\n${__("command.roll.turn_phrase")}: ${"🎲".repeat(
        roll
      )}\n${__("command.roll.total_phrase")}: **${this.total}**`
    );

    await message.edit(embed).catch(noop);
  }

  private async stop(message: Message) {
    const [embed] = message.embeds;
    embed.setColor("RED");
    await message.edit(embed).catch(noop);
    await message.reactions.removeAll().catch(noop);
    this.isPlaying = false;
    this.rolls = 0;
    this.total = 0;
    this.history = "";
  }
}
