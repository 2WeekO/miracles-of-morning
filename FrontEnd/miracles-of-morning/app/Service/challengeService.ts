import api from "./api";

export const challengeService = {
  // 챌린지 생성
  create: (data: any, token: string) =>
    api.post("/challenges", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // 로그인한 사용자의 챌린지 목록 조회
  getAll: (token: string) =>
    api.get("/challenges", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // 특정 챌린지 조회
  getById: (id: string, token: string) =>
    api.get(`/challenges/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // 상태 업데이트 (진행중/성공/실패)
  updateStatus: (id: string, status: string, token: string) =>
    api.patch(
      `/challenges/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    ),

  // 챌린지 삭제
  delete: (id: string, token: string) =>
    api.delete(`/challenges/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  
  // 인증
  verify(id: string, data: any, token: string) {
    return api.post(`/challenges/${id}/verify`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
