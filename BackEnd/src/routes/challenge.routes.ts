// routes/challenge.routes.ts
import { Router } from "express";
import { challengeController } from "../controllers/challenge.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, (req, res) => challengeController.getChallenges(req, res));
router.post("/", authMiddleware, (req, res) => challengeController.createChallenge(req, res));
router.patch("/:id/status", authMiddleware, (req, res) => challengeController.updateStatus(req, res));
router.delete("/:id", authMiddleware, (req, res) => challengeController.deleteChallenge(req, res));

export default router;
