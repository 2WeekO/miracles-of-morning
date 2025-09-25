import api from "./api";

export const authCodeService = {
  create: (data: any) => api.post("/authCodes", data),
  getAll: () => api.get("/authCodes"),
  getById: (id: number) => api.get(`/authCodes/${id}`),
  update: (id: number, data: Partial<any>) => api.put(`/authCodes/${id}`, data),
  delete: (id: number) => api.delete(`/authCodes/${id}`),
};
