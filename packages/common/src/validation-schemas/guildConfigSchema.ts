import { boolean, object, string } from "yup";

export const guildConfigSchema = object({
  prefix: string().required(),
  language: string()
    .oneOf(["en-US", "nl-NL"])
    .required(),
  welcomeMessage: string()
    .nullable()
    .notRequired(),
  welcomeChannelId: string().when("welcomeMessage", {
    is: Boolean, // Same as is: val => typeof val === "string" && val !== ""
    then: string().when("preferDM", {
      is: true,
      then: string()
        .nullable()
        .notRequired(),
      otherwise: string().required(),
    }),
    otherwise: string()
      .nullable()
      .notRequired(),
  }),
  welcomeRoleId: string()
    .nullable()
    .notRequired(),
  preferDM: boolean(),
  leaveMessage: string()
    .nullable()
    .notRequired(),
  leaveChannelId: string().when("leaveMessage", {
    is: Boolean,
    then: string().required(),
    otherwise: string()
      .nullable()
      .notRequired(),
  }),
});
