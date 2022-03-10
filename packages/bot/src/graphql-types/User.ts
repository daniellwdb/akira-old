import { Field, ObjectType } from "type-graphql";
import { Guild } from "./Guild";

@ObjectType()
export class User {
  @Field({ nullable: true })
  avatar?: string;

  @Field()
  discriminator: string;

  @Field(() => [Guild])
  guilds: Guild[];

  @Field()
  id: string;

  @Field()
  username: string;
}
