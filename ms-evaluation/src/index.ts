import "reflect-metadata"
import "./database/data-source"

import express from 'express'
import mainRouter from "./routes/mainRouter"
import env from "./config/env"

const PORT = env.TYPEORM_SERVERPORT
const app = express()

app.use(express.json())
app.use(mainRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

