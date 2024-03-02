import {Router} from "express";
import { getchatBotResponse } from '../controllers/chatBotControllers.js'

export const chatBotRouter = Router();


chatBotRouter.post("/", getchatBotResponse);

