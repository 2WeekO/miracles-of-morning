import { Server, Socket } from "socket.io";
import { roomService } from "../services/room.service";
import { RoomStatus } from "../entities/Room";


export function roomSocket(io: Server, socket: Socket) {
  console.log("🚀 그룹 챌린지 WebSocket 연결됨:", socket.id);

  //  방 목록 요청
  socket.on("rooms:get", async () => {
    try {
      const rooms = await roomService.getAllRooms();
      socket.emit("rooms:list", rooms);
    } catch (err: any) {
      socket.emit("rooms:error", { message: err.message });
    }
  });

  //  방 생성
  socket.on("room:create", async (data) => {
    try {
      const newRoom = await roomService.createRoom(data); //  이제 data 객체 그대로 전달
      io.emit("room:created", newRoom);

      const rooms = await roomService.getAllRooms();
      io.emit("rooms:list", rooms);
    } catch (err: any) {
      socket.emit("room:create:error", { message: err.message });
    }
  });

  //  방 참가
  socket.on("room:join", async (data) => {
    try {
      const updatedRoom = await roomService.joinRoom(data.roomId, data.userId);

      // 참가한 방 업데이트 + 전체 목록 갱신
      io.emit("room:updated", updatedRoom);
      const rooms = await roomService.getAllRooms();
      io.emit("rooms:list", rooms);
    } catch (err: any) {
      socket.emit("room:join:error", { message: err.message });
    }
  });

  //  연결 해제 로그
  socket.on("disconnect", () => {
    console.log("❌ 그룹 챌린지 연결 해제:", socket.id);
  });

  socket.on("room:start", async ({ roomId }) => {
    try {
      const updatedRoom = await roomService.updateRoomStatus(roomId, RoomStatus.RUNNING);
      io.emit("room:updated", updatedRoom);
    } catch (err: any) {
      socket.emit("error", { message: err.message });
    }
  });

  socket.on("room:end", async ({ roomId }) => {
    try {
      const updatedRoom = await roomService.updateRoomStatus(
        roomId,
        RoomStatus.FINISHED
      );
      io.emit("room:updated", updatedRoom);
    } catch (err: any) {
      socket.emit("error", { message: err.message });
    }
  });

  socket.on("room:leave", async ({ roomId, userId }) => {
    try {
      const updatedRoom = await roomService.leaveRoom(roomId, userId);
      io.emit("room:updated", updatedRoom);
    } catch (err: any) {
      socket.emit("error", { message: err.message });
    }
  });
}
