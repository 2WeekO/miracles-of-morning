import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from "typeorm";
import { Challenge } from "./Challenge";
import { Room } from "./Room";
import { User } from "./User";

export enum AttendanceStatus {
  SUCCESS = "success",
  FAIL = "fail",
  ABSENT = "absent",
}

@Entity()
@Unique(["user", "date", "challenge"]) // ✅ 1인 챌린지 중복 인증 방지
@Unique(["user", "date", "room"])      // ✅ 그룹 챌린지 중복 인증 방지
export class Attendance {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // 1인 챌린지 인증 기록
  @ManyToOne(() => Challenge, (challenge) => challenge.attendances, {
    nullable: true,
    onDelete: "CASCADE",
  })
  challenge?: Challenge;

  // 그룹 챌린지 인증 기록
  @ManyToOne(() => Room, (room) => room.attendances, {
    nullable: true,
    onDelete: "CASCADE",
  })
  room?: Room;

  @ManyToOne(() => User, (user) => user.attendances, { onDelete: "CASCADE" })
  user!: User;

  @Column({ type: "date" })
  date!: string;

  @Column({
    type: "enum",
    enum: AttendanceStatus,
    default: AttendanceStatus.ABSENT,
  })
  status!: AttendanceStatus;

  @CreateDateColumn()
  createdAt!: Date;
}
