
import { createClient } from "@supabase/supabase-js";
import { generateEmbedding } from "./embedding-service";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service role for writing

const supabase = createClient(supabaseUrl, supabaseKey);

export interface Document {
    content: string;
    metadata: Record<string, any>;
}

export async function indexDocument(content: string, metadata: Record<string, any> = {}) {
    const embedding = await generateEmbedding(content);

    const { error } = await supabase.from("documents").insert({
        content,
        metadata,
        embedding,
    });

    if (error) {
        throw new Error(`Error indexing document: ${error.message}`);
    }
}

export async function searchSimilarDocuments(query: string, matchThreshold = 0.5, matchCount = 3) {
    const embedding = await generateEmbedding(query);

    const { data, error } = await supabase.rpc("match_documents", {
        query_embedding: embedding,
        match_threshold: matchThreshold,
        match_count: matchCount,
    });

    if (error) {
        throw new Error(`Error searching documents: ${error.message}`);
    }

    return data;
}
