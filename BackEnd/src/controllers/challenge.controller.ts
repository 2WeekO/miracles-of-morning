// controllers/challenge.controller.ts
import { Response } from "express";
import { ChallengeStatus } from "../entities/Challenge";
import { AuthRequest } from "../middleware/auth";
import { challengeService } from "../services/challenge.service";
import { generateQRCode } from "../utils/qr.util";

export class ChallengeController {
  // GET /api/challenges
  async getChallenges(req: AuthRequest, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const challenges = await challengeService.getChallengesByUser(req.user.id);
    return res.json(challenges);
  }

  // POST /api/challenges
  async createChallenge(req: AuthRequest, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const {
      title,
      startDate,
      endDate,
      wakeUpTime,
      depositAmount,
      penaltyAmount,
    } = req.body;

    if (!title || !startDate || !endDate || !wakeUpTime) {
      return res.status(400).json({ message: "필수 값이 누락되었습니다." });
    }

    // QR코드 서버에서 자동 생성
    const qrPayload = `${req.user.id}-${title}-${new Date().toISOString()}`;
    const qrCode = await generateQRCode(qrPayload);

    const challenge = await challengeService.createChallenge({
      userId: req.user.id,
      title,
      qrCode,
      startDate,
      endDate,
      wakeUpTime,
      depositAmount,
      penaltyAmount,
    });

    return res.status(201).json(challenge);
  }

  // PATCH /api/challenges/:id/status
  async updateStatus(req: AuthRequest, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const challengeId = req.params.id;
    const { status } = req.body;

    if (!Object.values(ChallengeStatus).includes(status)) {
      return res.status(400).json({ message: "잘못된 상태 값" });
    }

    const updated = await challengeService.updateStatus(challengeId, status);
    return res.json(updated);
  }

  // DELETE /api/challenges/:id
  async deleteChallenge(req: AuthRequest, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const challengeId = req.params.id;
    await challengeService.deleteChallenge(challengeId);
    return res.status(204).end();
  }

  // POST /api/challenges/verify
  async verifyAttendance(req: AuthRequest, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const { targetId, type, success } = req.body;

    if (!targetId || !type) {
      return res.status(400).json({ message: "targetId와 type은 필수입니다." });
    }

    if (!["challenge", "room"].includes(type)) {
      return res.status(400).json({ message: "type은 challenge 또는 room 이어야 합니다." });
    }

    try {
      const result = await challengeService.verifyAttendance(
        req.user.id,
        targetId,
        type,
        success
      );
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}

export const challengeController = new ChallengeController();
