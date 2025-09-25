import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Attendance } from "../entities/Attendance";
import { AuthCode } from "../entities/Authcode";
import { Challenge } from "../entities/Challenge";
import { Room } from "../entities/Room";
import { RoomMember } from "../entities/RoomMember";
import { Transaction } from "../entities/Transaction"; //  수정 완료
import { User } from "../entities/User";


dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,   // 개발 환경에서만 true
  dropSchema: false,    // 개발 편의 (매번 테이블 재생성)
  logging: false,
  entities: [User, Challenge, Transaction, AuthCode, Room, RoomMember, Attendance],  //  우리가 만든 엔티티만 등록
  
});
