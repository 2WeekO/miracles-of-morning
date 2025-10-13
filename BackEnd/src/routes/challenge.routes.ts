// routes/challenge.routes.ts
import { Router } from "express";
import { challengeController } from "../controllers/challenge.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// 1인 챌린지 기본 CRUD
router.get("/", authMiddleware, (req, res) =>
  challengeController.getChallenges(req, res)
);
router.post("/", authMiddleware, (req, res) =>
  challengeController.createChallenge(req, res)
);
router.patch("/:id/status", authMiddleware, (req, res) =>
  challengeController.updateStatus(req, res)
);
router.delete("/:id", authMiddleware, (req, res) =>
  challengeController.deleteChallenge(req, res)
);

// ✅ 출석(인증) 처리 (1인 챌린지 + 그룹 챌린지 통합)
router.post("/verify", authMiddleware, (req, res) =>
  challengeController.verifyAttendance(req,res)
);

export default router;
