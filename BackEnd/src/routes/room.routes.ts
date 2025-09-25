import { Router } from "express";
import { roomController } from "../controllers/room.controller";

const router = Router();

router.get("/", (req, res) => roomController.getRooms(req, res));
router.get("/:id", (req, res) => roomController.getRoomById(req, res)); //  추가
router.post("/", (req, res) => roomController.createRoom(req, res));
router.post("/join", (req, res) => roomController.joinRoom(req, res));
router.patch("/status", (req, res) => roomController.updateStatus(req, res));
router.post("/leave", (req, res) => roomController.leaveRoom(req, res));


export default router;
