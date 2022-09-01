import { Router } from "express";

const mainRouter = Router()

mainRouter.get('/', (req, res) => {
    return res.json({message: 'you are in main router'})
})

export default mainRouter