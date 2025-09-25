import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Transaction } from "../entities/Transaction";

const transactionRepo = AppDataSource.getRepository(Transaction);

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = transactionRepo.create(req.body);
    await transactionRepo.save(transaction);
    return res.json(transaction);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const getTransactions = async (_: Request, res: Response) => {
  const transactions = await transactionRepo.find({ relations: ["user", "challenge"] });
  return res.json(transactions);
};

export const getTransaction = async (req: Request, res: Response) => {
  const transaction = await transactionRepo.findOne({
    where: { id: req.params.id },
    relations: ["user", "challenge"],
  });
  if (!transaction) return res.status(404).json({ message: "Transaction not found" });
  return res.json(transaction);
};

export const updateTransaction = async (req: Request, res: Response) => {
  const transaction = await transactionRepo.findOneBy({ id: req.params.id });
  if (!transaction) return res.status(404).json({ message: "Transaction not found" });
  transactionRepo.merge(transaction, req.body);
  await transactionRepo.save(transaction);
  return res.json(transaction);
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const result = await transactionRepo.delete(req.params.id);
  return res.json(result);
};
