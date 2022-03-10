import { Client, Constants, Message, PermissionResolvable } from "discord.js";
import { Request, Response } from "express";

type Category =
  | "general"
  | "fun"
  | "admin"
  | "owner"
  | "moderation"
  | "internal";

type ValueOf<T> = T[keyof T];

export interface IEventListener {
  event: ValueOf<Constants["Events"]>;
  once: boolean;
  propertyKey: string;
}

export interface ICommand {
  name: string;
  config: ICommandConfig;
  execute({ ...args }: IExecuteArgs): void | Promise<unknown>;
}

export interface ICommandConfig {
  aliases?: string[];
  description: string;
  category: Category;
  args?: boolean;
  usage?: string;
  examples?: string[];
  permissions?: PermissionResolvable[];
}

export interface IExecuteArgs {
  message: Message;
  args: string[];
  __: (key: string, placeholders?: object) => string;
}

export interface IContext {
  req: Request;
  res: Response;
  client: InstanceType<typeof Client>;
}
