
import { pipeline, env } from "@xenova/transformers";

// Skip local model checks for serverless environments
env.allowLocalModels = false;
env.useBrowserCache = false;

class EmbeddingService {
    private static instance: any = null;

    static async getPipeline() {
        if (!this.instance) {
            this.instance = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
        }
        return this.instance;
    }

    static async generateEmbedding(text: string): Promise<number[]> {
        const extractor = await this.getPipeline();
        const output = await extractor(text, { pooling: "mean", normalize: true });
        return Array.from(output.data);
    }
}

export const generateEmbedding = EmbeddingService.generateEmbedding.bind(EmbeddingService);
