
"use server";

import { generateResponse } from "@/lib/ai/llm-service";
import { searchWeb } from "@/lib/ai/tools/web-search";
import { parsePdf } from "@/lib/ai/tools/doc-parser";
import { searchSimilarDocuments, indexDocument } from "@/lib/ai/vector-store";

export async function processChat(
    history: { role: string; content: string }[],
    currentMessage: string,
    fileBase64?: string,
    fileName?: string
) {
    let context = "";
    let systemInstruction = "Eres Toby, un asistente virtual experto en mascotas de 'Animal Urbis'. Responde siempre en español, de forma amable y concisa. Usa el contexto proporcionado para responder si es relevante.";

    // 1. Handle File Upload (RAG on the fly)
    if (fileBase64 && fileName) {
        try {
            const buffer = Buffer.from(fileBase64, "base64");
            const text = await parsePdf(buffer);

            // Indexing for future retrieval (Persistent Memory)
            // await indexDocument(text, { source: "upload", filename: fileName });

            // For immediate context (Short-term memory approach for this chat turn)
            context += `\n\nContenido del documento adjunto (${fileName}):\n${text.slice(0, 10000)}\n\n`; // Limit text to avoid token limits per turn
            systemInstruction += " Has recibido un documento del usuario. Úsalo para responder sus preguntas sobre él.";
        } catch (e) {
            console.error("Error reading file", e);
            return "Hubo un error al leer el archivo adjunto. Por favor asegúrate de que es un PDF válido.";
        }
    }

    // 2. Identify Intent (Simple heuristic for "Search" vs "Chat")
    // In a real agent, we'd do a "Router" LLM call first.
    const lowerMsg = currentMessage.toLowerCase();
    const needsWebSearch =
        lowerMsg.includes("quien es") ||
        lowerMsg.includes("buscar") ||
        lowerMsg.includes("actualidad") ||
        lowerMsg.includes("última hora");

    const needsInternalSearch =
        lowerMsg.includes("normativa") ||
        lowerMsg.includes("ley") ||
        lowerMsg.includes("animal urbis");

    // 3. Retrieve Context
    if (needsWebSearch) {
        const webResult = await searchWeb(currentMessage);
        context += `\n\nInformación de Internet:\n${webResult}\n\n`;
    }

    if (needsInternalSearch) {
        // This assumes we have indexed our own site content previously. 
        // For now, this might return empty if DB is empty, but the logic is ready.
        try {
            const docs = await searchSimilarDocuments(currentMessage);
            const docText = docs?.map(d => d.content).join("\n---\n") || "";
            if (docText) {
                context += `\n\nInformación Interna de Animal Urbis:\n${docText}\n\n`;
            }
        } catch (e) {
            console.warn("Internal search failed", e);
        }
    }

    // 4. Construct Final Prompt
    const finalPrompt = `
${systemInstruction}

CONTEXTO ADICIONAL:
${context}

HISTORIAL:
${history.map(m => `${m.role}: ${m.content}`).join("\n")}

USUARIO: ${currentMessage}
ASISTENTE:
  `;

    // 5. Call LLM
    return await generateResponse(finalPrompt);
}
