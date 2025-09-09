import { Request, Response } from "express";
import * as userService from "../services/userService";
import jwt from "jsonwebtoken";

// 회원가입 컨트롤러
export async function signup(req: Request, res: Response) {
  try {
    const { email, password, nickname , phonenumber} = req.body;
    const user = await userService.registerUser(email, password, nickname, phonenumber);
    res.status(201).json({ message: "회원가입 성공", user });
  } catch (err: any) {
    res.status(400).json({ message: "회원가입 실패", err });
  }
}

// 로그인 컨트롤러
export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.json({ message: "로그인 성공", token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}
