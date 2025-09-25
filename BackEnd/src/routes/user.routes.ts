import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();
router.post("/", createUser);
router.get("/me", authMiddleware, getMe)
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
