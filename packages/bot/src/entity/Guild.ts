import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { Command } from "./Command";

@Entity()
@ObjectType("GuildConfiguration")
export class Guild extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ default: true })
  isCached: boolean;

  @Column({ default: process.env.PREFIX })
  @Field()
  prefix: string;

  @Column({ default: "en-US" })
  @Field()
  language: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  welcomeMessage?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  welcomeChannelId?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  welcomeRoleId?: string;

  @Column({ default: false })
  @Field()
  preferDM: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  leaveMessage?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  leaveChannelId?: string;

  @ManyToMany(() => Command, { eager: true })
  @JoinTable()
  @Field(() => Command)
  disabledCommands: Command[];
}
