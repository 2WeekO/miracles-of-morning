import { io } from "socket.io-client";

export const socket = io("http://172.30.1.9:5000", {
  transports: ["websocket"],
  autoConnect: true,
});
