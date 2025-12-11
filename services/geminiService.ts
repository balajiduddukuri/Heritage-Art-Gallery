import { GoogleGenAI } from "@google/genai";
import { ArtStyle } from "../types";
import { ART_PROMPTS } from "../constants";

// Initialize the client
// NOTE: We rely on the environment variable API_KEY being available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArtImage = async (style: ArtStyle): Promise<string> => {
  const promptConfig = ART_PROMPTS[style];
  
  if (!promptConfig) {
    throw new Error("Invalid art style selected");
  }

  try {
    // We use gemini-2.5-flash-image for standard generation.
    // If high quality is critical, one could switch to 'gemini-3-pro-image-preview',
    // but Flash is generally faster and sufficient for this style.
    const model = 'gemini-2.5-flash-image';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            text: promptConfig.prompt,
          },
        ],
      },
      config: {
        // We don't need tools like googleSearch for this creative task.
        // We let the model interpret the style prompt.
      }
    });

    // Iterate through parts to find the image
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64Data}`;
        }
      }
    }
    
    throw new Error("No image data found in the response");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};