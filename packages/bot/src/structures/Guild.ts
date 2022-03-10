import { Client, Structures } from "discord.js";
import { Command } from "../entity/Command";
import { Guild as GuildEntity } from "../entity/Guild";
import { ICommand } from "../types";
import { getCommandByName } from "../util/misc";

interface IGuildSettings {
  isCached: boolean;
  prefix: string;
  language: string;
  disabledCommands: Command[];
  welcomeMessage?: string;
  welcomeChannelId?: string;
  welcomeRoleId?: string;
  preferDM: boolean;
  leaveMessage?: string;
  leaveChannelId?: string;
}

declare module "discord.js" {
  interface Guild {
    getAll(): Promise<IGuildSettings>;
    get<K extends keyof IGuildSettings>(key: K): Promise<IGuildSettings[K]>;
    set<K extends keyof IGuildSettings, V = IGuildSettings[K]>(
      key: K,
      value: V
    ): Promise<void>;
  }
}

const defaultSettings: IGuildSettings = {
  isCached: false,
  prefix: process.env.PREFIX!,
  language: "en-US",
  disabledCommands: [] as Command[],
  preferDM: false,
};

export = Structures.extend(
  "Guild",
  Guild =>
    class extends Guild {
      constructor(client: Client, data: object) {
        super(client, data);
      }

      async getAll() {
        const guildSettings =
          (await GuildEntity.findOne(this.id)) ?? defaultSettings;

        return guildSettings;
      }

      async get<K extends keyof IGuildSettings>(key: K) {
        const guild = await GuildEntity.findOne(this.id);

        return guild ? guild[key] : defaultSettings[key];
      }

      async set<K extends keyof IGuildSettings, V = IGuildSettings[K]>(
        key: K,
        value: V
      ) {
        if (key === "disabledCommands") {
          const name = ((value as unknown) as string).toLowerCase();
          const command = getCommandByName(name);

          if (!command) {
            return;
          }

          const targetCommand = await Command.findOne({ where: { name } });
          let guild = await GuildEntity.findOne(this.id);

          if (guild) {
            return this.toggleCommandEnabled(command, targetCommand!, guild);
          }

          await GuildEntity.create({
            ...defaultSettings,
            id: this.id,
            isCached: true,
            disabledCommands: [targetCommand!],
          }).save();
        }

        let guild = await GuildEntity.findOne(this.id);

        if (guild) {
          await GuildEntity.update(this.id, { [key]: value });
        } else {
          await GuildEntity.insert({
            ...defaultSettings,
            id: this.id,
            isCached: true,
            [key]: value,
          });
        }
      }

      private async toggleCommandEnabled(
        command: ICommand,
        targetCommand: Command,
        guild: GuildEntity
      ) {
        const idx = guild.disabledCommands.findIndex(
          c => c.name === command.name
        );

        if (idx >= 0) {
          guild.disabledCommands.splice(idx, 1);
          guild.disabledCommands.splice(idx, 1);
        } else {
          guild.disabledCommands.push(targetCommand);
          guild.disabledCommands.push(targetCommand);
        }

        await guild!.save();
      }
    }
);
