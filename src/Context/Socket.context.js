import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("---- Client Connected to server ----");
});

socket.on("disconnect", () => {
  console.log("---- Disconnected from Server ----");
});

export default socket;
