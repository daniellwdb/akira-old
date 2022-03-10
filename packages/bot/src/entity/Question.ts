import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./Answer";

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: string;

  @Column()
  messageId: string;

  @Column()
  answerCache: string;

  @OneToMany(
    () => Answer,
    answer => answer.question
  )
  answers: Answer[];
}
