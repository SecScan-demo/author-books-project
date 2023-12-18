import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"

import { authorRouter } from "./author/author.router"

dotenv.config()

// exit if unable to find a port
if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(cors())
app.use(express.json())

// routes
app.use("/api/authors", authorRouter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})