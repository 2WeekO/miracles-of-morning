import { AppDataSource } from "../config/data-source";
import { Room, RoomStatus } from "../entities/Room";
import { RoomMember } from "../entities/RoomMember";
import { User } from "../entities/User";

class RoomService {
  private readonly roomRepo = AppDataSource.getRepository(Room);
  private readonly memberRepo = AppDataSource.getRepository(RoomMember);
  private readonly userRepo = AppDataSource.getRepository(User);

  // 방 전체 조회
  async getAllRooms() {
    return await this.roomRepo.find({
      relations: ["host", "members", "members.user"],
      order: { createdAt: "DESC" },
    });
  }

  async getRoomById(id: string) {
    return await this.roomRepo.findOne({
      where: { id },
      relations: ["host", "members", "members.user"],
    });
  }

  // 방 생성
  async createRoom(data: {
    title: string;
    maxParticipants: number;
    hostId: string;
    wakeUpTime: string;
    depositAmount: number;
    penaltyAmount: number;
    isPrivate: boolean;
    password?: string | null;
  }) {
    const host = await this.userRepo.findOne({ where: { id: data.hostId } });
    if (!host) throw new Error("Host user not found");

    const room = this.roomRepo.create({
      title: data.title,
      maxParticipants: data.maxParticipants,
      host,
      wakeUpTime: data.wakeUpTime,
      depositAmount: data.depositAmount,
      penaltyAmount: data.penaltyAmount,
      isPrivate: data.isPrivate,
      password: data.isPrivate ? data.password : null,
      status: RoomStatus.WAITING,
    });

    const savedRoom = await this.roomRepo.save(room);

    // 호스트 자동 참가
    const member = this.memberRepo.create({ room: savedRoom, user: host });
    await this.memberRepo.save(member);

    return savedRoom;
  }

  // 방 참가
  async joinRoom(roomId: string, userId: string) {
    const room = await this.roomRepo.findOne({
      where: { id: roomId },
      relations: ["members", "members.user"],
    });
    if (!room) throw new Error("Room not found");

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    if (room.members.length >= room.maxParticipants) {
      throw new Error("Room is full");
    }

    const existing = await this.memberRepo.findOne({ where: { room, user } });
    if (existing) throw new Error("User already joined");

    const member = this.memberRepo.create({ room, user });
    await this.memberRepo.save(member);

    return room;
  }

  // 챌린지 상태 업데이트
  async updateRoomStatus(roomId: string, status: RoomStatus) {
    const room = await this.roomRepo.findOne({
      where: { id: roomId },
      relations: ["members", "host"],
    });
    if (!room) throw new Error("Room not found");

    room.status = status;
    return await this.roomRepo.save(room);
  }

  // 방 나가기
  async leaveRoom(roomId: string, userId: string) {
    const member = await this.memberRepo.findOne({
      where: { room: { id: roomId }, user: { id: userId } },
      relations: ["room", "user"],
    });
    if (!member) throw new Error("참가 기록 없음");

    await this.memberRepo.remove(member);

    // 최신 방 정보 반환
    return await this.roomRepo.findOne({
      where: { id: roomId },
      relations: ["members", "members.user", "host"],
    });
  }
}

export const roomService = new RoomService();
