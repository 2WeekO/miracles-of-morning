// services/challenge.service.ts
import { AppDataSource } from "../config/data-source";
import { Challenge, ChallengeStatus } from "../entities/Challenge";
import { Transaction } from "../entities/Transaction";
import { User } from "../entities/User";

class ChallengeService {
  private challengeRepo = AppDataSource.getRepository(Challenge);
  private userRepo = AppDataSource.getRepository(User);
  private transactionRepo = AppDataSource.getRepository(Transaction);

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
    const challenge = await this.challengeRepo.findOneByOrFail({ id: challengeId });
    challenge.status = status;
    return await this.challengeRepo.save(challenge);
  }

  /** 챌린지 삭제 */
  async deleteChallenge(challengeId: string) {
    return await this.challengeRepo.delete({ id: challengeId });
  }
}

export const challengeService = new ChallengeService();
