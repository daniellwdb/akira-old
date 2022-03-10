import { Client, ClientOptions } from "discord.js";
import { ICommand, IEventListener } from "../types";

type PublicClassMethods<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

export class Registerer<T> extends Client {
  static listeners: IEventListener[] = [];
  static commands: ICommand[] = [];

  constructor(options?: ClientOptions) {
    super(options);

    Registerer.listeners.forEach(listener => {
      const { event, once, propertyKey } = listener;

      this[once ? "once" : "on"](
        event,
        (this as ThisType<T>)[propertyKey as PublicClassMethods<ThisType<T>>]
      );
    });
  }
}
