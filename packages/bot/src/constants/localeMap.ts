import { Locale } from "date-fns";
import enUS from "date-fns/locale/en-US";
import nl from "date-fns/locale/nl";

export const localeMap: Record<string, Locale> = {
  "nl-NL": nl,
  "en-US": enUS,
};
