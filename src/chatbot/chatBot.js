import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { config } from 'dotenv'
import { retriever } from '../utils/retriever.js'
import { combineDocuments } from "../utils/combineDocuments.js";

config()
const openAIApiKey = process.env.OPENAI_API_KEY

const chatModel = new ChatOpenAI({ openAIApiKey, streaming: true, });

const promptTemplate = `you will be gived an input from the user, your role is to reforme his correcti his sentence, reforme it in a short way that can be more understandable but not necesserly longer
userInput: {input}`

const botTemplate = `You are a helpful law consultant that works for "SouQLinker", your job is to help the user with his law quesions and guid him in a process based on these laws if you can
you will be provided with some laws context to help you answer the question or the request
the laws will be from Algeria and related to trading, suppliers, and whatever concern the trading ministery of Algeria
you have to:
- answer based on the laws context provided
- be friendly with the user
- try not to make answers from your mind
- answer the user in the same language he asked his question in
- respect the laws as much possible and if you see that you cant answer based on those laws say that you cant answer
laws context: {context}
user's question: {question}
answer: `

const contextPrompt = ChatPromptTemplate.fromMessages([
    ["system", promptTemplate],
    ["user", "{input}"],
])

const answerPrompt = ChatPromptTemplate.fromMessages([
    ["system", botTemplate],
    ["user", "{question} {context}"],
])

const outputParser = new StringOutputParser();

export const contextChain = contextPrompt.pipe(chatModel).pipe(outputParser).pipe(retriever);
export const answerChain = answerPrompt.pipe(chatModel).pipe(outputParser);
// answerChain.stream

// try {
//     const question = `who is dio brando`
//     const contextDocuments = await contextChain.invoke({input: question})
//     console.log("contextDocuments ready")
//     const context = combineDocuments(contextDocuments)
//     const streramResponse = await answerChain.stream({question: question, context:context})
    
//     for await (const chunk of streramResponse) {
//         process.stdout.write(chunk)
//     }
// } catch (err) {
//     console.log(err) 
// } 