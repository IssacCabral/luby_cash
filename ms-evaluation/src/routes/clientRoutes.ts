import { Router } from "express";
import { StoreClientController } from "../app/controllers/clients/StoreClientController";

const clientRouter = Router()

clientRouter.post('/clients', new StoreClientController().store)

export default clientRouter