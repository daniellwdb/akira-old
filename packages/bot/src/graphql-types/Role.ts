import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Role {
  @Field()
  id: string;

  @Field()
  name: string;
}
