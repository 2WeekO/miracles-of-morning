import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Transaction } from "./Transaction";

export enum ChallengeStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAIL = "fail",
}

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // 유저 1:N 챌린지
  @ManyToOne(() => User, (user) => user.challenges, { onDelete: "CASCADE" })
  user!: User;

  @Column()
  title!: string;

  // QR 코드 문자열 (챌린지 인증용)
  @Column("longtext")
  qrCode!: string;

  // 챌린지 시작일
  @Column()
  startDate!: Date;

  // 챌린지 종료일
  @Column()
  endDate!: Date;

  // 매일 기상 시간 (예: "08:00")
  @Column()
  wakeUpTime!: string;

  // 예치금
  @Column("int")
  depositAmount!: number;

  // 하루 실패 시 차감 금액
  @Column("int")
  penaltyAmount!: number;

  // 상태: 진행중/성공/실패
  @Column({
    type: "enum",
    enum: ChallengeStatus,
    default: ChallengeStatus.PENDING,
  })
  status!: ChallengeStatus;

  @CreateDateColumn()
  createdAt!: Date;

  // 관련된 트랜잭션 (예치금/환급/패널티 등)
  @OneToMany(() => Transaction, (transaction) => transaction.challenge)
  transactions!: Transaction[];
}
