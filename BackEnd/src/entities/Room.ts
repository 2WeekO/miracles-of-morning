import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { RoomMember } from "./RoomMember";
import { Attendance } from "./Attendance";

export enum RoomStatus {
  WAITING = "waiting",
  RUNNING = "running",
  FINISHED = "finished"
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({
    type: "enum",
    enum: RoomStatus,
    default: RoomStatus.WAITING
  })
  status!: RoomStatus;

  @Column()
  maxParticipants!: number;

  @Column({ type: "datetime", nullable: true })
  startTime!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  // 호스트 (User 1:N Room)
  @ManyToOne(() => User, (user) => user.hostedRooms, { onDelete: "CASCADE" })
  host!: User;

  // 참가자 (Room 1:N RoomMember)
  @OneToMany(() => RoomMember, (member) => member.room)
  members!: RoomMember[];

  // 출석 기록 (Room 1:N Attendance)
  @OneToMany(() => Attendance, (attendance) => attendance.room)
  attendances!: Attendance[];

  @Column({ type: "time", nullable: true })
  wakeUpTime!: string;

  @Column({ type: "int", default: 0 })
  depositAmount!: number;

  @Column({ type: "int", default: 0 })
  penaltyAmount!: number;

  @Column({ type: "boolean", default: false })
  isPrivate!: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  password?: string | null;

}
