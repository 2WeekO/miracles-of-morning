import { Router } from "express";
import {
  createAuthCode,
  getAuthCodes,
  getAuthCode,
  updateAuthCode,
  deleteAuthCode,
} from "../controllers/authcode.controller";

const router = Router();
router.post("/", createAuthCode);
router.get("/", getAuthCodes);
router.get("/:id", getAuthCode);
router.put("/:id", updateAuthCode);
router.delete("/:id", deleteAuthCode);

export default router;
