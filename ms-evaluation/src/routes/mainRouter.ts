import { Router } from "express";

import clientRouter from "./clientRoutes";

const mainRouter = Router()

mainRouter.get('/', (req, res) => {
    return res.json({message: 'you are in main router'})
})


export default mainRouter
                    .use(clientRouter)