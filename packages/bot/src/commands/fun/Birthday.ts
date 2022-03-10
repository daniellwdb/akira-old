import { parseFromTimeZone } from "date-fns-timezone";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import { listTimeZones } from "timezone-support";
import { localeMap } from "../../constants/localeMap";
import { command } from "../../decorators/command";
import { Birthday as BirthdayEntity } from "../../entity/Birthday";
import { BirthdayConfig } from "../../entity/BirthdayConfig";
import { BaseCommand } from "../../structures/BaseCommand";
import { IExecuteArgs } from "../../types";
import { messageCollector } from "../../util/collectors";

@command()
export class Birthday extends BaseCommand {
  constructor() {
    super("bday", {
      aliases: ["birthday"],
      description: "command.bday.desc",
      category: "fun",
    });
  }

  async execute({ message, __ }: IExecuteArgs) {
    const birthdayConfig = await BirthdayConfig.findOne(message.guild!.id);

    if (!birthdayConfig) {
      return message.channel.send(__("command.bday.is_disabled"));
    }

    const questions = messageCollector(
      message,
      __("command.bday.questions").split("|")
    );

    const replies = [];

    for await (const reply of questions) {
      if (!reply) {
        return message.reply(__("command.bday.cancelled"));
      }

      replies.push(reply);
    }

    const [tzReply, bdayReply] = replies;

    const timeZone = listTimeZones().find(
      tz => tz.toLowerCase() === tzReply.toLowerCase()
    );

    if (!timeZone) {
      return message.reply(__("command.bday.invalid_timezone"));
    }

    // const date = parseFromTimeZone(`2020-${bdayReply} 12:00:00`, {
    //   timeZone
    // });

    const date = parseFromTimeZone(`2000-${bdayReply} 00:00:00`, { timeZone });

    if (!isValid(date)) {
      return message.reply(__("command.bday.invalid_format"));
    }

    const dateToStore = date
      .toISOString()
      .slice("2000:".length)
      .split(":")[0];

    const bday = await BirthdayEntity.findOne({
      where: { userId: message.author.id, birthdayConfig },
    });

    const language = await message.guild!.get("language");
    const locale = localeMap[language];

    if (!bday) {
      await BirthdayEntity.create({
        userId: message.author.id,
        date: dateToStore,
        birthdayConfig,
      }).save();
    } else {
      bday.date = dateToStore;
      await bday.save();
    }

    return message.reply(
      __("command.bday.updated", {
        date: format(date, "MMMM, d", { locale }),
      })
    );
  }
}
