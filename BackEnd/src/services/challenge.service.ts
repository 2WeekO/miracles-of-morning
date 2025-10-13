// services/challenge.service.ts
import { AppDataSource } from "../config/data-source";
import { Attendance, AttendanceStatus } from "../entities/Attendance";
import { Challenge, ChallengeStatus } from "../entities/Challenge";
import { Transaction } from "../entities/Transaction";
import { User } from "../entities/User";


class ChallengeService {
  private readonly challengeRepo = AppDataSource.getRepository(Challenge);
  private readonly userRepo = AppDataSource.getRepository(User);
  private readonly transactionRepo = AppDataSource.getRepository(Transaction);
  private readonly attendanceRepo = AppDataSource.getRepository(Attendance);

  /** 로그인한 사용자의 모든 챌린지 조회 */
  async getChallengesByUser(userId: string) {
    return await this.challengeRepo.find({
      where: { user: { id: userId } },
      relations: ["transactions"],
    });
  }

  /** 챌린지 생성 */
  async createChallenge(data: {
    userId: string;
    title: string;
    qrCode: string;
    startDate: Date;
    endDate: Date;
    wakeUpTime: string;
    depositAmount: number;
    penaltyAmount: number;
  }) {
    const user = await this.userRepo.findOneByOrFail({ id: data.userId });

    //  1) 챌린지 먼저 저장
    const challenge = this.challengeRepo.create({
      ...data,
      user,
    });
    await this.challengeRepo.save(challenge);

    //  2) 예치금 트랜잭션 추가
    if (data.depositAmount > 0) {
      const depositTx = this.transactionRepo.create({
        user,
        challenge,
        amount: -data.depositAmount,
        type: "deposit",
      });
      await this.transactionRepo.save(depositTx);
    }

    return challenge;
  }

  /** 챌린지 상태 업데이트 */
  async updateStatus(challengeId: string, status: ChallengeStatus) {
    const challenge = await this.challengeRepo.findOneByOrFail({
      id: challengeId,
    });
    challenge.status = status;
    return await this.challengeRepo.save(challenge);
  }

  /** 챌린지 삭제 */
  async deleteChallenge(challengeId: string) {
    return await this.challengeRepo.delete({ id: challengeId });
  }


  // 출석 인증
  async verifyAttendance(
    userId: string,
    targetId: string,
    type: "challenge" | "room",
    success: boolean
  ) {
    const user = await this.userRepo.findOneByOrFail({ id: userId });

    // 오늘 날짜
    const today = new Date().toISOString().split("T")[0];

    // 중복 인증 방지
    const where =
      type === "challenge"
        ? { challenge: { id: targetId }, user: { id: userId }, date: today }
        : { room: { id: targetId }, user: { id: userId }, date: today };

    const existing = await this.attendanceRepo.findOne({ where });
    if (existing) {
      return { success: false, message: "오늘 이미 인증했습니다." };
    }

    // 출석 기록 생성
    const record = this.attendanceRepo.create({
      user,
      date: today,
      status: success ? AttendanceStatus.SUCCESS : AttendanceStatus.FAIL,
      ...(type === "challenge"
        ? { challenge: { id: targetId } }
        : { room: { id: targetId } }),
    });

    await this.attendanceRepo.save(record);

    return { success, message: success ? "인증 성공" : "인증 실패" };
  }
}

export const challengeService = new ChallengeService();
