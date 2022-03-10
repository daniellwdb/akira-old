import { ICommand, ICommandConfig, IExecuteArgs } from "../types";

export abstract class BaseCommand implements ICommand {
  constructor(public name: string, public config: ICommandConfig) {
    this.name = name;
    this.config = config;
  }

  abstract execute({ ...args }: IExecuteArgs): void | Promise<unknown>;
}
