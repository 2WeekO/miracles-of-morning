import { io } from "socket.io-client";

export const socket = io("http://172.30.1.99:5000", {
  transports: ["websocket"],
  autoConnect: true,
});
