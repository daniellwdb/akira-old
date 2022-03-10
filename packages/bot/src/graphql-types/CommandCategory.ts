import { Field, ObjectType } from "type-graphql";

@ObjectType()
class CommandConfig {
  @Field(() => [String], { nullable: true })
  aliases?: string[];

  @Field()
  description: string;

  @Field({ nullable: true })
  usage?: string;

  @Field(() => [String], { nullable: true })
  examples?: string[];

  @Field(() => [String], { nullable: true })
  permissions?: string[];
}

@ObjectType("CommandWithConfig")
class Command {
  @Field()
  name: string;

  @Field(() => CommandConfig)
  config: CommandConfig;
}

@ObjectType()
export class CommandCategory {
  @Field()
  category: string;

  @Field(() => [Command])
  commands: Command[];
}
