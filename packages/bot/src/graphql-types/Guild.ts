import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Guild {
  @Field({ nullable: true })
  icon?: string;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  owner: string;

  @Field()
  permissions: number;
}
