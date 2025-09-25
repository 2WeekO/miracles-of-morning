import api from "./api";

export interface SignupData {
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  const res = await api.post("/users", data);
  return res.data;
};

export const signin = async (data: SigninData) => {
  const res = await api.post("/auth/signin", data);
  return res.data;
};
