import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique
} from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

export enum AttendanceStatus {
  SUCCESS = "success",
  FAIL = "fail",
  ABSENT = "absent"
}

@Entity()
@Unique(["room", "user", "date"]) // 하루 한 번만 기록 가능
export class Attendance {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Room, (room) => room.attendances, { onDelete: "CASCADE" })
  room!: Room;

  @ManyToOne(() => User, (user) => user.attendances, { onDelete: "CASCADE" })
  user!: User;

  @Column({ type: "date" })
  date!: string;

  @Column({
    type: "enum",
    enum: AttendanceStatus,
    default: AttendanceStatus.ABSENT
  })
  status!: AttendanceStatus;

  @CreateDateColumn()
  createdAt!: Date;
}
