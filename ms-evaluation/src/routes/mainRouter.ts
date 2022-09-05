import { Router } from "express";

import clientRouter from "./clientRoutes";
import transactionRouter from "./transactionRouter";

const mainRouter = Router()

mainRouter.get('/', (req, res) => {
    return res.json({message: 'you are in main router'})
})


export default mainRouter
                    .use(clientRouter)
                    .use(transactionRouter)