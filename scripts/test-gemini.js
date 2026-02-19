
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

async function testGemini() {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    let apiKey = '';

    try {
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            const lines = envContent.split('\n');
            for (const line of lines) {
                const parts = line.split('=');
                if (parts[0] && parts[0].trim() === 'GEMINI_API_KEY' && parts[1]) {
                    apiKey = parts[1].trim();
                    break;
                }
            }
        }
    } catch (e) {
        console.error("Could not read .env.local file");
    }

    console.log("Testing with API Key:", apiKey ? "FOUND (" + apiKey.substring(0, 5) + "...)" : "MISSING");

    if (!apiKey) {
        console.error("No API key found in .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Return a JSON object: { \"message\": \"Hello from Gemini!\", \"status\": \"success\" }";

    try {
        console.log("Sending request to Gemini...");
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        });
        const response = await result.response;
        // Check for safety ratings blocking
        if (response.promptFeedback && response.promptFeedback.blockReason) {
            console.error("BLOCKED! Reason:", response.promptFeedback.blockReason);
            return;
        }

        const text = response.text();
        console.log("SUCCESS! Raw Response:", text);
    } catch (error) {
        console.error("FAILED!");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        // Log candidate info if available (common for safety blocks)
        if (error.response && error.response.candidates && error.response.candidates.length > 0) {
            console.error("Candidate Finish Reason:", error.response.candidates[0].finishReason);
            if (error.response.candidates[0].safetyRatings) {
                console.error("Safety Ratings:", JSON.stringify(error.response.candidates[0].safetyRatings, null, 2));
            }
        }
    }
}

testGemini();
