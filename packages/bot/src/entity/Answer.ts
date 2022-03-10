import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: string;

  @Column()
  index: number;

  @ManyToOne(
    () => Question,
    question => question.answers,
    {
      onDelete: "CASCADE",
    }
  )
  question: Question;
}
