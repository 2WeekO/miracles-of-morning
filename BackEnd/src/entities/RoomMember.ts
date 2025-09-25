import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique
} from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

@Entity()
@Unique(["room", "user"]) // 같은 방에 중복 참가 방지
export class RoomMember {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Room, (room) => room.members, { onDelete: "CASCADE" })
  room!: Room;

  @ManyToOne(() => User, (user) => user.roomMemberships, { onDelete: "CASCADE" })
  user!: User;

  @CreateDateColumn()
  joinedAt!: Date;
}
