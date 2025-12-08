
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateResponse(prompt: string) {
    if (!apiKey) {
        return "Error: No Google AI API Key configured.";
    }

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return "Lo siento, tuve un problema al procesar tu solicitud. Inténtalo de nuevo.";
    }
}
