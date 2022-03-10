import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Birthday } from "./Birthday";

@Entity()
@ObjectType()
export class BirthdayConfig extends BaseEntity {
  @PrimaryColumn()
  @Field()
  guildId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  announceChannelId?: string;

  @OneToMany(
    () => Birthday,
    birthday => birthday.birthdayConfig
  )
  birthdays: Birthday[];
}
