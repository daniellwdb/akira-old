import { Command } from "../entity/Command";
import { BaseCommand } from "../structures/BaseCommand";
import { Registerer } from "../structures/Registerer";
import { logger } from "../util/logger";

export const command = () => (Target: new () => BaseCommand) => {
  const target = new Target();
  Registerer.commands.push(target);

  (async () => {
    const foundTarget = await Command.findOne({ where: { name: target.name } });

    if (!foundTarget) {
      await Command.insert({ name: target.name });
    }
  })();

  logger.info(`Successfully loaded command ${target.name}`);
};
