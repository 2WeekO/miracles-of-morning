import api from "./api";

export const userService = {
  create: (data: { email: string; password: string; nickname: string; phoneNumber: string }) =>
    api.post("/users", data),
  getMe: () => api.get("/users/me"),
  getAll: () => api.get("/users"),
  getById: (id: number) => api.get(`/users/${id}`),
  update: (id: number, data: Partial<any>) => api.put(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),

};
