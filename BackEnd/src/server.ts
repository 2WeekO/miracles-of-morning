import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { AppDataSource } from "./config/data-source";

//  라우터 import
import authRoutes from "./routes/auth.routes";
import authCodeRoutes from "./routes/authcode.routes";
import challengeRoutes from "./routes/challenge.routes";
import roomRoutes from "./routes/room.routes";
import transactionRoutes from "./routes/transaction.routes";
import userRoutes from "./routes/user.routes";

//  소켓 import
import { roomSocket } from "./sockets/room.socket";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

//  REST API 라우트 등록
app.use("/users", userRoutes);
app.use("/challenges", challengeRoutes);
app.use("/transactions", transactionRoutes);
app.use("/authcodes", authCodeRoutes);
app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes); // 그룹 챌린지 REST API

//  HTTP + WebSocket 서버
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

//  WebSocket 연결
io.on("connection", (socket) => {
  roomSocket(io, socket); // 모듈화된 socket 로직 실행
});

//  DB 연결 후 서버 시작
AppDataSource.initialize()
  .then(() => {
    console.log(" MySQL 데이터베이스 연결 성공");
    httpServer.listen(PORT, () => {
      console.log(` 서버 실행 중: http://172.30.1.99:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ DB 연결 실패:", err));
