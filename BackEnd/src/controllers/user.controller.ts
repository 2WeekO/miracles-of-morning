import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { AuthRequest } from "../middleware/auth";

const userRepo = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, nickname ,phoneNumber} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = userRepo.create({ email, password: hashedPassword, nickname , phoneNumber});
    await userRepo.save(user);
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const getUsers = async (_: Request, res: Response) => {
  const users = await userRepo.find();
  return res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await userRepo.findOneBy({ id: req.params.id });
  if (!user) return res.status(404).json({ message: "(userController/getUser) User not found" });
  return res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await userRepo.findOneBy({ id: req.params.id });
  if (!user) return res.status(404).json({ message: "(userController/updataUser)User not found" });
  userRepo.merge(user, req.body);
  await userRepo.save(user);
  return res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const result = await userRepo.delete(req.params.id);
  return res.json(result);
};

export const getMe = async (req: AuthRequest, res: Response) =>  {
  try{
    const user = await userRepo.findOneBy({id: req.user.id});
    if (!user) {
      return res.status(401).json({message:"(userController/getMe) User not found"});
    }
    return res.json({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      phoneNumber: user.phoneNumber,
    });

  } catch(err){
    return err
  }

}
