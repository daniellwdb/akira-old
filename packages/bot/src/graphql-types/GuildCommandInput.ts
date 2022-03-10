import { Field, InputType } from "type-graphql";

@InputType()
export class GuildCommandInput {
  @Field()
  guildId: string;

  @Field()
  commandName: string;
}
