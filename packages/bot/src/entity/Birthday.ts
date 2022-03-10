import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { BirthdayConfig } from "./BirthdayConfig";

@Entity()
export class Birthday extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  date: string;

  @ManyToOne(
    () => BirthdayConfig,
    birthdayConfig => birthdayConfig.birthdays
  )
  birthdayConfig: BirthdayConfig;
}
