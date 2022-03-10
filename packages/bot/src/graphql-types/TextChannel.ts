import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TextChannel {
  @Field()
  id: string;

  @Field()
  name: string;
}
