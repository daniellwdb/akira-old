import { Field, ObjectType } from "type-graphql";
import { Guild } from "../entity/Guild";
import { FieldError } from "./FieldError";

@ObjectType()
export class GuildResponse {
  @Field(() => Guild, { nullable: true })
  guild?: Guild;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
