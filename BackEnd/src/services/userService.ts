import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export async function registerUser(email: string, password: string, nickname: string, phonenumber: string) {
  const existing = await userRepo.findOneBy({ email });
  if (existing) throw new Error("이미 존재하는 이메일입니다.");

  const phonenumberExists = await userRepo.findOneBy({ phonenumber });
  if (phonenumberExists) throw new Error("이미 존재하는 전화번호입니다.");

  const hashed = await bcrypt.hash(password, 10);
  const newUser = userRepo.create({ email, password: hashed, nickname , phonenumber });
  return await userRepo.save(newUser);
}

export async function loginUser(email: string, password: string) {
  const user = await userRepo.findOneBy({ email });
  if (!user) throw new Error("존재하지 않는 유저입니다.");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("비밀번호가 틀렸습니다.");

  return user;
}
