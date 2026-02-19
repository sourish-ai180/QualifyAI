
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

async function testGemini() {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    let apiKey = '';

    try {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/GEMINI_API_KEY=(.*)/);
        if (match && match[1]) {
            apiKey = match[1].trim();
        }
    } catch (e) {
        console.error("Could not read .env.local file");
        return;
    }

    console.log("Testing with API Key:", apiKey ? "FOUND (" + apiKey.substring(0, 5) + "...)" : "MISSING");

    if (!apiKey) {
        console.error("No API key found in .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Return a JSON object: { "message": "Hello from Gemini!", "status": "success" }
    `;

    try {
        console.log("Sending request to Gemini...");
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        });
        const response = await result.response;
        const text = response.text();
        console.log("SUCCESS! Raw Response:", text);
    } catch (error) {
        console.error("FAILED!");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        if (error.response) {
            console.error("Error Response:", JSON.stringify(error.response, null, 2));
        }
        // If it's a safety error, inspect it
        if (error.response?.candidates && error.response.candidates[0]?.finishReason) {
            console.error("Finish Reason:", error.response.candidates[0].finishReason);
        }
    }
}

testGemini();
