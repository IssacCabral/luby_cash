import express from 'express'

import env from './app/config/env'

const PORT = env.SERVER_PORT 
const app = express()

app.get('/', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})