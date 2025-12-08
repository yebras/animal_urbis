
import * as cheerio from "cheerio";

interface SearchResult {
    title: string;
    link: string;
    snippet: string;
}

export async function searchWikipedia(query: string): Promise<string> {
    try {
        const response = await fetch(
            `https://es.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=3&srsearch=${encodeURIComponent(
                query
            )}`
        );
        const data = await response.json();

        if (!data.query?.search?.length) {
            return "";
        }

        // Get the first result's text content (simplified)
        const firstResult = data.query.search[0];
        const pageId = firstResult.pageid;

        // Fetch extract
        const extractRes = await fetch(
            `https://es.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${pageId}`
        );
        const extractData = await extractRes.json();
        const extract = extractData.query.pages[pageId].extract;

        return `Wikipedia Source (${firstResult.title}):\n${extract.slice(0, 1000)}...`;
    } catch (error) {
        console.error("Wikipedia Search Error:", error);
        return "";
    }
}

export async function searchWeb(query: string): Promise<string> {
    // Basic implementation using a "free" search via scraping (e.g. DDG or similar) is flimsy in production.
    // For stability in this demo, we will prioritize Wikipedia + a mock "Web Search" fallback if needed,
    // or we can implement a simple scraper for DuckDuckGo html if strictly needed.
    // Given the constraints, Wikipedia is the most reliable "Free" structured knowledge source.

    const wikiResult = await searchWikipedia(query);
    if (wikiResult) return wikiResult;

    return "No se encontró información fiable en las fuentes gratuitas configuradas (Wikipedia).";
}
