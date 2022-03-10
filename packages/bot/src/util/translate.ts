import { promises as fs } from "fs";
import { logger } from "./logger";

type Translation = string | { [key: string]: Translation };

const cache: Record<string, Translation> = {};

export const loadTranslations = async (dir: string) => {
  const files = await fs.readdir(dir);
  const translations = files.filter(file => file.endsWith(".json"));

  for (const file of translations) {
    cache[file.slice(0, -5)] = await import(`${dir}/${file}`);

    logger.info(`Successfully loaded translations from file: ${file}`);
  }
};

export const setLanguage = (lang: string) => (
  key: string,
  placeholders?: object
) => {
  let translation = key
    .split(".")
    .reduce(
      (acc, val) => (typeof acc === "object" ? acc[val] : acc),
      cache[lang]
    );

  if (typeof translation !== "string") {
    throw Error(
      `Could not find a translation for ${key} using language ${lang}`
    );
  }

  for (const [key, value] of Object.entries(placeholders || {})) {
    translation = translation.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  return translation;
};
