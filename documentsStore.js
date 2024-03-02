import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { OpenAIEmbeddings } from "@langchain/openai"
import fs from 'fs/promises';
import { config } from 'dotenv'

config()

const supabaseApiKey = process.env.SUPABASE_API_KEY
const openAIApiKey = process.env.OPENAI_API_KEY
const supabaseUrl = process.env.SUPABASE_URL

try {
    const text = await fs.readFile('laws.txt', 'utf-8');
    const spliter = new RecursiveCharacterTextSplitter({
        separators: ["############"]
    })
    const output = await spliter.createDocuments([text])

    const supabaseClient = createClient(supabaseUrl, supabaseApiKey)

    const vectorStore = new SupabaseVectorStore(
        new OpenAIEmbeddings({ openAIApiKey }),
        {
            client: supabaseClient,
            tableName: "documents"
        }
    )
    await vectorStore.addDocuments(output)
} catch (err) {
    console.log(err)
}


