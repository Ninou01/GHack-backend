import { combineDocuments } from '../utils/combineDocuments.js'
import { contextChain, answerChain } from './chatBot.js'

export const chatbotStreamResponse = async (res, input) => {
    const contextDocuments = await contextChain.invoke({input: input})
    const context = combineDocuments(contextDocuments)
    const streramResponse = await answerChain.stream({question: input, context:context})
    let response = ""
    
    for await (const chunk of streramResponse) {
        process.stdout.write(chunk)
        response += chunk
        res.write(chunk)
    }

    // console.log("response ended")

    res.end();
    return response
}