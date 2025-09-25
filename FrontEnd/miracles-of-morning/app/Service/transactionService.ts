import api from "./api";

export const transactionService = {
  create: (data: any) => api.post("/transactions", data),
  getAll: () => api.get("/transactions"),
  getById: (id: number) => api.get(`/transactions/${id}`),
  update: (id: number, data: Partial<any>) => api.put(`/transactions/${id}`, data),
  delete: (id: number) => api.delete(`/transactions/${id}`),
};
