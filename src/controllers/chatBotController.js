import { chatbotStreamResponse } from '../chatbot/chatBotStreamResponse.js'
import { successResponse, errorResponse } from '../utils/responseSending.js'

export const getchatBotResponse = async (req, res) => {
    try {
        const userInput = req.body.input
        if (!userInput) {
            return errorResponse(res, "user input was not provided", 400)
        }
        const response = await chatbotStreamResponse(res, userInput);
        // return successResponse(res, {answer: response}, 200)
        
    } catch (err) {
        console.error(err.message)
        return errorResponse(res, "something went bad " + err.message, 500)
    }
}