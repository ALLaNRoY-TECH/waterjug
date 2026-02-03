'use server';

import { generateHint, type GenerateHintInput } from '@/ai/flows/generate-hint';

export async function getAIHint(input: GenerateHintInput) {
  try {
    const result = await generateHint(input);
    if (result && result.isHelpful) {
      return result.hint;
    }
    return "The AI is pondering... try a different move first!";
  } catch (error) {
    console.error("Error getting AI hint:", error);
    return "Sorry, the AI hint service is currently unavailable.";
  }
}
