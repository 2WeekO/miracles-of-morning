import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { AuthCode } from "../entities/Authcode";

const authCodeRepo = AppDataSource.getRepository(AuthCode);

export const createAuthCode = async (req: Request, res: Response) => {
  try {
    const authCode = authCodeRepo.create(req.body);
    await authCodeRepo.save(authCode);
    return res.json(authCode);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const getAuthCodes = async (_: Request, res: Response) => {
  const codes = await authCodeRepo.find({ relations: ["user"] });
  return res.json(codes);
};

export const getAuthCode = async (req: Request, res: Response) => {
  const code = await authCodeRepo.findOne({
    where: { id: req.params.id },
    relations: ["user"],
  });
  if (!code) return res.status(404).json({ message: "AuthCode not found" });
  return res.json(code);
};

export const updateAuthCode = async (req: Request, res: Response) => {
  const code = await authCodeRepo.findOneBy({ id: req.params.id });
  if (!code) return res.status(404).json({ message: "AuthCode not found" });
  authCodeRepo.merge(code, req.body);
  await authCodeRepo.save(code);
  return res.json(code);
};

export const deleteAuthCode = async (req: Request, res: Response) => {
  const result = await authCodeRepo.delete(req.params.id);
  return res.json(result);
};
