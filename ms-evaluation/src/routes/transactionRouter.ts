import { Router } from "express";
import TransactionsController from "../app/controllers/transactions/TransactionsController";

const transactionRouter = Router()

transactionRouter.post('/transactions', new TransactionsController().handleTransaction)

export default transactionRouter