import { Field, InputType } from "type-graphql";

@InputType()
export class GuildInput {
  @Field()
  guildId: string;

  @Field()
  prefix: string;

  @Field()
  language: string;

  @Field({ nullable: true })
  welcomeMessage?: string;

  @Field({ nullable: true })
  welcomeChannelId?: string;

  @Field({ nullable: true })
  welcomeRoleId?: string;

  @Field()
  preferDM: boolean;

  @Field({ nullable: true })
  leaveMessage?: string;

  @Field({ nullable: true })
  leaveChannelId?: string;
}
