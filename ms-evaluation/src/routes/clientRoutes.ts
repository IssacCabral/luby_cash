import { Router } from "express";
import { StoreClientController } from "../app/controllers/clients/StoreClientController";
import { IndexClientsController } from "../app/controllers/clients/IndexClientsController";

const clientRouter = Router()

clientRouter.post('/clients', new StoreClientController().store)
clientRouter.get('/clients', new IndexClientsController().index)

export default clientRouter