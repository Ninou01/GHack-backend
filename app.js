import express from 'express'
import { config } from 'dotenv'
import { chatBotRouter } from './src/routers/chatBotRouter.js'
import userRouter from './src/routers/userRouter.js'
import subscriptionRouter from './src/routers/subscriptionRouter.js'
import sectorRouter from './src/routers/sectorRouter.js'
import exhibitionRouter from './src/routers/exhibitionRouter.js'
import authRouter from './src/routers/authRouter.js'
import cors from "cors";

config()

const app = express()
app.use(cors());
app.use(express.json())

app.use("/api/v1/chatbot", chatBotRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/subscription", subscriptionRouter)
app.use("/api/v1/exhibition", exhibitionRouter)
app.use("/api/v1/sector", sectorRouter)
app.use("/api/v1/auth", authRouter)

app.get("/", (req, res) => {
    res.json({message: "hello"})
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))