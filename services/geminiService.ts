
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Generates post content based on a user prompt using the Gemini API.
 * @param prompt - The user's prompt for the post content.
 * @returns The generated text as a string.
 */
export const generatePostContent = async (prompt: string): Promise<string> => {
  if (!prompt) {
    throw new Error("Prompt cannot be empty.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a short, engaging social media post based on the following idea: "${prompt}". Keep it under 280 characters. Include relevant emojis and hashtags.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 100,
        thinkingConfig: { thinkingBudget: 20 },
      },
    });
    
    return response.text.trim();

  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
};
