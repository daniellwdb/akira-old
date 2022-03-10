import { Message, MessageReaction } from "discord.js";
import { User } from "../graphql-types/User";

export const reactionCollector = async (
  message: Message,
  authorId: string,
  validReactions: string[]
) => {
  for (const reaction of validReactions) {
    await message.react(reaction);
  }

  const filter = (reaction: MessageReaction, user: User) => {
    return validReactions.includes(reaction.emoji.name) && user.id === authorId;
  };

  return message
    .awaitReactions(filter, { max: 1, time: 60000 })
    .then(collected => collected.first()?.emoji.name);
};

export async function* messageCollector(message: Message, questions: string[]) {
  const filter = (msg: Message) => msg.author.id === message.author.id;

  for (const question of questions) {
    await message.reply(question);

    yield message.channel
      .awaitMessages(filter, { max: 1, time: 60000 })
      .then(collected => collected.first()?.content);
  }
}
