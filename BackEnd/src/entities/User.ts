import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Challenge } from "./Challenge";
import { Transaction } from "./Transaction";
import { AuthCode } from "./Authcode";
import { Room } from "./Room";
import { RoomMember } from "./RoomMember";
import { Attendance } from "./Attendance";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  nickname!: string;

  @Column({ nullable: true })
  phoneNumber!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  balance!: number;

  @CreateDateColumn()
  createdAt!: Date;

  /** 기존 기능 */
  @OneToMany(() => Challenge, (challenge) => challenge.user)
  challenges!: Challenge[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions!: Transaction[];

  @OneToMany(() => AuthCode, (authCode) => authCode.user)
  authCodes!: AuthCode[];

  /** 그룹 챌린지 관련 기능 */
  // 내가 호스트인 챌린지 방
  @OneToMany(() => Room, (room) => room.host)
  hostedRooms!: Room[];

  // 내가 참가자로 속한 기록
  @OneToMany(() => RoomMember, (member) => member.user)
  roomMemberships!: RoomMember[];

  // 내가 남긴 출석 기록
  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances!: Attendance[];
}
