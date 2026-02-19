
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFile = path.resolve(__dirname, 'test-output.txt');

function log(message) {
    fs.appendFileSync(logFile, message + '\n');
    console.log(message);
}

// Clear log file
if (fs.existsSync(logFile)) {
    fs.unlinkSync(logFile);
}

const modelName = "gemini-flash-latest";

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
                    apiKey = parts[1].trim().replace(/^"|"$/g, '');
                    break;
                }
            }
        }
    } catch (e) {
        log("Could not read .env.local file: " + e.message);
    }

    if (!apiKey) {
        log("No API key found in .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const prompt = "Return a JSON object: { \"message\": \"Hello\", \"status\": \"success\" }";

    log(`\n---------------------------------`);
    log(`Trying model: ${modelName}`);

    try {
        const model = genAI.getGenerativeModel({ model: modelName });

        // Try with JSON mode
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        });
        const response = await result.response;
        const text = response.text();
        log(`SUCCESS with ${modelName}! Response: ` + text);

    } catch (error) {
        log(`FAILED with ${modelName}: ${error.message}`);
        if (error.response) {
            const candidate = error.response.candidates?.[0];
            if (candidate) {
                log("Finish Reason: " + candidate.finishReason);
            }
        }
    }
}

testGemini().catch(e => log("Unhandled error: " + e.message));
