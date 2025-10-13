import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Attendance } from "../entities/Attendance";
import { AuthCode } from "../entities/Authcode";
import { Challenge } from "../entities/Challenge";
import { Room } from "../entities/Room";
import { RoomMember } from "../entities/RoomMember";
import { Transaction } from "../entities/Transaction";
import { User } from "../entities/User";


dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  dropSchema: false,
  logging: false,
  entities: [User, Challenge, Transaction, AuthCode, Room, RoomMember, Attendance],
  
});
