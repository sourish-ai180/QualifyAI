"use server";

import { model } from '@/lib/gemini';
import { QualificationCriteria, ChatMessage } from '@/types';

export async function generateQualifyingQuestions(criteria: QualificationCriteria): Promise<string[]> {
    const prompt = `
    You are an expert sales qualifier. Generate 3-5 qualifying questions based on the following criteria:
    
    Target Persona: ${criteria.idealPersona}
    Minimum Budget: $${criteria.minBudget}
    Timeline: ${criteria.maxTimelineMonths} months
    Key Problems to Identify: ${criteria.keyProblems.join(', ')}

    The questions should be natural, conversational, and designed to uncover if the lead meets these criteria without being interrogative.
    Return ONLY a JSON array of strings. Example: ["Question 1", "Question 2"]
  `;

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        });
        const response = await result.response;
        const text = response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error("Error generating questions:", error);
        // Fallback
        return [
            "Could you tell me a bit more about your current situation?",
            "What are your primary goals for this project?",
            "What is your estimated budget for this initiative?"
        ];
    }
}

export async function analyzeLeadResponse(
    history: ChatMessage[],
    latestInput: string,
    criteria: QualificationCriteria
): Promise<{
    nextQuestion: string;
    isComplete: boolean;
    score?: number;
    status?: 'HOT' | 'WARM' | 'COLD';
    summary?: string;
}> {
    const prompt = `
    You are an expert sales qualifier for a business with the following criteria:
    
    Target Persona: ${criteria.idealPersona}
    Minimum Budget: $${criteria.minBudget}
    Timeline: ${criteria.maxTimelineMonths} months
    Key Problems to Identify: ${criteria.keyProblems.join(', ')}

    Analyze the conversation history and the latest user response.
    
    History: ${JSON.stringify(history)}
    Latest User Input: "${latestInput}"

    Your goal is to politely and professionally qualify the lead based on these criteria.
    - Ask ONE question at a time.
    - Be conversational, not robotic.
    - If the user's answers clearly indicate they do NOT fit the criteria (e.g. way too low budget), politely end the qualification.
    - If the user seems like a good fit, continue until you are confident.
    
    If you have enough information to make a decision OR if the conversation has reached a natural conclusion:
    Mark "isComplete": true.
    
    Return a JSON object with the following structure:
    {
      "nextQuestion": "The next response or question to the user",
      "isComplete": boolean,
      "score": number (0-100, optional, only if complete. 90+ for perfect fit, <50 for bad fit),
      "status": "HOT" | "WARM" | "COLD" (optional, only if complete),
      "summary": "Brief summary of the lead's key data points (Budget, Timeline, Problems)" (optional, only if complete)
    }
  `;

    try {
        // Log input for debugging
        console.log("Analyzing response for:", latestInput);

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        });
        const response = await result.response;
        const text = response.text();

        console.log("AI Raw Response:", text); // Debug log

        try {
            const parsed = JSON.parse(text);
            return parsed;
        } catch (jsonError) {
            console.error("JSON Parse Error:", jsonError);
            console.error("Failed JSON text:", text);
            throw jsonError; // Re-throw to hit the main catch block
        }
    } catch (error) {
        console.error("Error analyzing response:", error);
        // Fallback only if absolutely necessary, but try to be more specific
        return {
            nextQuestion: "I see. Could you elaborate on that a bit more?",
            isComplete: false
        };
    }
}
