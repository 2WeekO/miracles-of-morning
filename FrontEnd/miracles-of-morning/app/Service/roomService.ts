import api from "./api";

export const roomService = {
  // 방 전체 조회
  getAll: (token?: string) =>
    api.get("/rooms", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),

  // 방 상세 조회
  getById: (id: string, token: string) =>
    api.get(`/rooms/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // 방 생성
  create: (data: { title: string; maxParticipants: number; hostId: string }, token: string) =>
    api.post("/rooms", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // 방 참가
  join: (roomId: string, userId: string, token: string) =>
    api.post(
      "/rooms/join",
      { roomId, userId },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
};
