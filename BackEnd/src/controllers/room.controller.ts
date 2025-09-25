import { Request, Response } from "express";
import { roomService } from "../services/room.service";

export class RoomController {
  async getRooms(req: Request, res: Response) {
    try {
      const rooms = await roomService.getAllRooms();
      return res.json(rooms);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getRoomById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const room = await roomService.getRoomById(id);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      return res.json(room);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async createRoom(req: Request, res: Response) {
    try {
      const room = await roomService.createRoom(req.body);
      return res.status(201).json(room);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async joinRoom(req: Request, res: Response) {
    try {
      const { roomId, userId } = req.body;
      const room = await roomService.joinRoom(roomId, userId);
      return res.json(room);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { roomId, status } = req.body;
      const updatedRoom = await roomService.updateRoomStatus(roomId, status);
      return res.json(updatedRoom);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async leaveRoom(req: Request, res: Response) {
    try {
      const { roomId, userId } = req.body;
      const updatedRoom = await roomService.leaveRoom(roomId, userId);
      return res.json(updatedRoom);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export const roomController = new RoomController();
