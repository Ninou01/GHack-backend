import {Router} from "express";
import { getchatBotResponse } from '../controllers/chatBotController.js'

export const chatBotRouter = Router();


chatBotRouter.post("/", getchatBotResponse);

