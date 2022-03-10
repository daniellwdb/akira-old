import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class GuildMember {
  @Field()
  id: string;

  @Field()
  name: string;
}
