import express from 'express'
import { config } from 'dotenv'
import { chatBotRouter } from './src/routers/chatBotRouter.js'
import cors from "cors";

config()

const app = express()
app.use(cors());
app.use(express.json())

app.use("/api/v1/chatbot", chatBotRouter)

app.get("/", (req, res) => {
    res.json({message: "hello"})
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))