import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { OpenAIEmbeddings } from "@langchain/openai"
import { config } from 'dotenv'

config()

const supabaseApiKey = process.env.SUPABASE_API_KEY
const openAIApiKey = process.env.OPENAI_API_KEY
const supabaseUrl = process.env.SUPABASE_URL

const supabaseClient = createClient(supabaseUrl, supabaseApiKey)
const vectorStore = new SupabaseVectorStore(
    new OpenAIEmbeddings({ openAIApiKey }),
    {
        client: supabaseClient,
        tableName: "documents",
        queryName: "match_documents"
    }
)

export const retriever = vectorStore.asRetriever()


