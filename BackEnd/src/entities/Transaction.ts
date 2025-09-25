import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Challenge } from "./Challenge";


@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Challenge, (challenge) => challenge.transactions, {
    nullable: true,
    onDelete: "CASCADE",
  })
  challenge!: Challenge | null;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: "enum", enum: ["deposit", "reward", "penalty"] })
  type!: "deposit" | "reward" | "penalty";

  @CreateDateColumn()
  createdAt!: Date;
}
