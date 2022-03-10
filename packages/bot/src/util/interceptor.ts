import format from "date-fns/format";
import { Message } from "discord.js";
import { Presence } from "../entity/Presence";
import { getLocale } from "./misc";
import { setLanguage } from "./translate";

export const interceptor = async (message: Message) => {
  const language = await message.guild!.get("language");
  const userMentions = message.mentions.users;
  const __ = setLanguage(language);
  const locale = getLocale(language);

  if (userMentions.size) {
    const presences = await Presence.find({
      where: { guildId: message.guild!.id },
    });

    const statusses = presences.filter(presence =>
      [...userMentions.keys()].includes(presence.userId)
    );

    if (statusses.length) {
      for (const {
        createdDate,
        userId,
        status,
        showStatusOnMention,
      } of statusses) {
        const member = await message.guild!.members.fetch(userId);

        if (!member) {
          await Presence.delete({ guildId: message.guild!.id, userId });
        }

        if (!showStatusOnMention) {
          break;
        }

        message.channel.send(
          __("interceptor.afk", {
            member: member.displayName,
            status,
            date: format(createdDate, "MMMM dd yyyy", {
              locale,
            }),
          })
        );
      }
    }
  }

  if (
    userMentions.first()?.id === message.client.user!.id &&
    message.content.toLowerCase().includes("help")
  ) {
    const prefix = message.guild!.get("prefix");
    message.channel.send(__("interceptor.help", { prefix }));
  }
};
