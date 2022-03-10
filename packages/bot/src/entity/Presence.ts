import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["guildId", "userId"])
@ObjectType()
export class Presence extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  guildId: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  status: string;

  @Column({ nullable: true })
  showStatusOnMention: boolean;

  @CreateDateColumn()
  @Field()
  createdDate: Date;
}
