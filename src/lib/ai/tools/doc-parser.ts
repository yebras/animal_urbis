
export async function parsePdf(buffer: Buffer): Promise<string> {
    try {
        // Dynamically require pdf-parse to avoid ESM/CJS build issues with default exports
        const pdf = require("pdf-parse");
        const data = await pdf(buffer);
        return data.text;
    } catch (error) {
        console.error("PDF Parse Error:", error);
        throw new Error("No se pudo leer el archivo PDF.");
    }
}
