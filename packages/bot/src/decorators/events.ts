import { Registerer } from "../structures/Registerer";
import { IEventListener } from "../types";

const listener = <T extends Registerer<unknown>>(
  options: Omit<IEventListener, "propertyKey">
) => (_: T, propertyKey: string) => {
  Registerer.listeners.push({ propertyKey, ...options });
};

export const on = (event: IEventListener["event"]) => {
  return listener({ event, once: false });
};

export const once = (event: IEventListener["event"]) => {
  return listener({ event, once: true });
};
