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
    const laws = await fs.readFile('laws.txt', 'utf-8');
    const dangerous_products = await fs.readFile("produit_dangeureux.txt", "utf-8")
    const spliter = new RecursiveCharacterTextSplitter({
        separators: ['\n\n', '\n', ' ', '', "############"]
    })
    const output = await spliter.createDocuments([laws])

    const supabaseClient = createClient(supabaseUrl, supabaseApiKey)

    await supabaseClient.from('documents').delete();

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


