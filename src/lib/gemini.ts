import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in environment variables. AI features will not work.");
}

const genAI = new GoogleGenerativeAI(apiKey || "DUMMY_KEY");

export const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
