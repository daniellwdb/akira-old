import format from "date-fns/format";
import {
  ClientOptions,
  Guild,
  GuildMember,
  Message,
  MessageReaction,
  TextChannel,
  User,
} from "discord.js";
import { schedule } from "node-cron";
import { numericEmojis } from "../constants/numericEmojis";
import { on, once } from "../decorators/events";
import { Answer } from "../entity/Answer";
import { Birthday } from "../entity/Birthday";
import { Question } from "../entity/Question";
import { interceptor } from "../util/interceptor";
import { logger } from "../util/logger";
import {
  getCommandByName,
  noop,
  resolveMissingPermissions,
} from "../util/misc";
import { setLanguage } from "../util/translate";
import { Registerer } from "./Registerer";

export class AkiraClient extends Registerer<AkiraClient> {
  constructor(options?: ClientOptions) {
    super(options);
  }

  @once("ready")
  onceReady() {
    this.user?.setActivity("@Akira help | akira-bot.netlify.com");
    logger.info(`${this.user?.username} is ready`);
    schedule("0 * * * *", async () => await this.sendBirthdayNotifications());
  }

  @on("message")
  async onMessage(message: Message) {
    if (message.author.bot || !message.guild) {
      return;
    }

    if (
      message.channel instanceof TextChannel &&
      message.channel
        .permissionsFor(message.client.user!)
        ?.missing("SEND_MESSAGES").length
    ) {
      return;
    }

    await interceptor(message);

    const guildSettings = await message.guild.getAll();

    const prefix = guildSettings.prefix;

    if (!message.content.startsWith(prefix)) {
      return;
    }

    const [commandName, ...args] = message.content
      .slice(prefix.length)
      .split(/ +/);

    const command = getCommandByName(commandName.toLowerCase());

    if (!command) {
      return;
    }

    const __ = setLanguage(guildSettings.language);
    const disabledCommands = guildSettings.disabledCommands;

    if (disabledCommands.some(cmd => cmd.name === command.name)) {
      return message.channel.send(__("guard.command_disabled"));
    }

    if (
      command.config.category === "owner" &&
      message.author.id !== process.env.OWNER_ID
    ) {
      return message.channel.send(__("guard.owner_only"));
    }

    if (command.config.args && !args.length) {
      return message.channel.send(
        __("guard.no_args", {
          prefix,
          commandName: command.name,
          usage: __(command.config.usage!),
        })
      );
    }

    if (command.config.permissions) {
      const clientMember = await message.guild.members.fetch(
        message.client.user!.id
      );

      const messageMember = await message.guild.members.fetch(
        message.author.id
      );

      const missingClientPerms = resolveMissingPermissions(
        message.channel as TextChannel,
        clientMember,
        command.config.permissions
      );

      if (missingClientPerms.length) {
        return message.channel.send(
          __("guard.client_missing_perms", {
            perms: missingClientPerms.join(", "),
          })
        );
      }

      const missingMemberPerms = resolveMissingPermissions(
        message.channel as TextChannel,
        messageMember,
        command.config.permissions
      );

      if (missingMemberPerms.length) {
        return message.channel.send(
          __("guard.member_missing_perms", {
            perms: missingMemberPerms.join(", "),
          })
        );
      }
    }

    if (
      process.env.NODE_ENV === "development" &&
      message.guild.id !== "647864531523207179"
    ) {
      return message.channel.send(
        "Akira is currently in development, new features are being added or Akira is being updated, feel free to join https://discord.gg/c7QPsSq if you have any questions."
      );
    }

    try {
      logger.info(
        `[${format(new Date(), "dd-MM-yy @HH:mm:ss")}] - ${
          message.author.tag
        } executed command: ${command.name} in: ${message.guild.name}`
      );

      // @ts-ignore - Property 'then' does not exist on type '({ ...args }: IExecuteArgs) => void | Promise<unknown>'.ts(2339)
      if (typeof command.execute.then === "function") {
        await command.execute({ message, args, __ });
      } else {
        return command.execute({ message, args, __ });
      }
    } catch (err) {
      logger.error(`Error executing command: ${command.name} - ${err}`);
    }
  }

  @on("guildMemberAdd")
  async onGuildMemberAdd(member: GuildMember) {
    const guildSettings = await member.guild.getAll();
    const welcomeRoleId = guildSettings.welcomeRoleId;

    if (welcomeRoleId) {
      const role = member.guild.roles.get(welcomeRoleId);

      if (role) {
        member.roles.add(role).catch(noop);
      }
    }

    const welcomeMessage = guildSettings.welcomeMessage;

    if (!welcomeMessage) {
      return;
    }

    const prefersDM = guildSettings.preferDM;
    let recipient: GuildMember | TextChannel;

    if (prefersDM) {
      recipient = member;
    } else {
      const welcomeChannelId = guildSettings.welcomeChannelId;

      if (!welcomeChannelId) {
        return;
      } else {
        const channel = member.guild.channels.get(
          welcomeChannelId
        ) as TextChannel;

        if (!channel) {
          await member.guild.set("welcomeChannelId", null);

          return;
        }

        recipient = channel;
      }
    }

    if (!recipient) {
      return;
    }

    recipient
      .send(
        welcomeMessage
          .replace("{{user}}", member.toString())
          .replace("{{tag}}", member.user.tag)
      )
      .catch(noop);
  }

  @on("guildMemberRemove")
  async onGuildMemberRemove(member: GuildMember) {
    const guildSettings = await member.guild.getAll();
    const leaveMessage = guildSettings.leaveMessage;
    const leaveChannelId = guildSettings.leaveChannelId;

    if (!leaveMessage || !leaveChannelId) {
      return;
    }

    const channel = member.guild.channels.get(leaveChannelId) as TextChannel;

    if (!channel) {
      await member.guild.set("leaveMessage", null);
      await member.guild.set("leaveChannelId", null);

      return;
    }

    channel
      .send(
        leaveMessage
          .replace("{{user}}", member.toString())
          .replace("{{tag}}", member.user.tag)
      )
      .catch(noop);
  }

  @on("messageReactionAdd")
  async onMessageReactionAdd(reaction: MessageReaction, user: User) {
    if (user.bot) {
      return;
    }

    const message = reaction.message;

    if (message.partial) {
      await message.fetch();
    }

    const isNumericEmoji = message.reactions.some(r => {
      return numericEmojis.includes(r.emoji.name);
    });

    if (!isNumericEmoji) {
      return;
    }

    const question = await Question.findOne({
      where: { messageId: message.id },
      relations: ["answers"],
    });

    if (!question) {
      if (message.embeds.length) {
        const addedEmoji = message.reactions.find(
          r => r.users.has(user.id) && r.emoji.name !== reaction.emoji.name
        );

        if (addedEmoji) {
          await addedEmoji.users.remove(user);
        }
      }

      return;
    }

    await reaction.users.remove(user);
    const answer = question.answers.find(answer => answer.authorId === user.id);
    const index = numericEmojis.findIndex(r => r === reaction.emoji.name);

    if (answer) {
      answer.index = index;
      await answer.save();
    } else {
      await Answer.create({
        authorId: user.id,
        index,
        question,
      }).save();
    }

    const __ = setLanguage(await message.guild!.get("language"));
    const pollAuthor = message.guild!.members.get(question.authorId);

    if (!pollAuthor) {
      message.delete().catch(noop);
    }

    const [embed] = message.embeds;
    const [, count] = await Answer.findAndCount({ question });
    const [lastLine] = embed.description.split("\n").slice(-1);

    if (!lastLine.startsWith("🗳")) {
      embed.setDescription(
        `${embed.description}\n${__("command.poll.votes", { count })}`
      );
    }

    const lastStringIdx = embed.description.lastIndexOf("\n");

    embed.setDescription(
      `${embed.description.substring(
        0,
        lastStringIdx
      )}\n${__("command.poll.votes", { count })}`
    );

    await message.edit(embed);
  }

  async sendBirthdayNotifications() {
    // const birthdays = await Birthday.find({
    //   where: {
    //     date: Raw(
    //       alias =>
    //         `strftime('%m',${alias}) = strftime('%m','now') AND strftime('%d',${alias}) = strftime('%d','now')`
    //     )
    //   },
    //   relations: ["birthdayConfig"]
    // });

    const birthdays = await Birthday.find({
      where: {
        date: new Date()
          .toISOString()
          .slice("year:".length)
          .split(":")[0],
      },
      relations: ["birthdayConfig"],
    });

    for (const birthday of birthdays) {
      const guild = this.guilds.get(birthday.birthdayConfig.guildId);

      if (!guild) {
        return;
      }

      const member = await guild.members.fetch(birthday.userId);

      if (!member) {
        return;
      }

      const channel = guild.channels.get(
        birthday.birthdayConfig.announceChannelId ?? ""
      );

      const __ = setLanguage(await guild.get("language"));

      if (channel && channel instanceof TextChannel) {
        return channel.send(__("misc.happy_birthday", { member }));
      }

      member.send(__("misc.happy_birthday", { member })).catch(noop);
    }

    return;
  }

  @on("guildCreate")
  onGuildCreate(guild: Guild) {
    logger.info(`${this.user?.username} was added to: ${guild.name}`);
  }
}
