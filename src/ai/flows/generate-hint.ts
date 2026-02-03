// src/ai/flows/generate-hint.ts
'use server';
/**
 * @fileOverview A flow to generate hints for the Aqua Puzzle game using GenAI.
 *
 * - generateHint - A function that generates a hint for the current level.
 * - GenerateHintInput - The input type for the generateHint function.
 * - GenerateHintOutput - The return type for the generateHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHintInputSchema = z.object({
  jugA: z.number().describe('The capacity of Jug A.'),
  jugB: z.number().describe('The capacity of Jug B.'),
  target: z.number().describe('The target amount of water to measure.'),
  currentA: z.number().describe('The current amount of water in Jug A.'),
  currentB: z.number().describe('The current amount of water in Jug B.'),
  moves: z.number().describe('The number of moves the player has made.'),
});

export type GenerateHintInput = z.infer<typeof GenerateHintInputSchema>;

const GenerateHintOutputSchema = z.object({
  hint: z.string().describe('A helpful hint for the current level.'),
  isHelpful: z.boolean().describe('Whether the hint is deemed helpful or not.')
});

export type GenerateHintOutput = z.infer<typeof GenerateHintOutputSchema>;

export async function generateHint(input: GenerateHintInput): Promise<GenerateHintOutput> {
  return generateHintFlow(input);
}

const hintPrompt = ai.definePrompt({
  name: 'hintPrompt',
  input: {schema: GenerateHintInputSchema},
  output: {schema: GenerateHintOutputSchema},
  prompt: `You are an AI assistant designed to provide hints for a water jug puzzle game.

The player is trying to measure exactly {{target}} liters of water using two jugs, Jug A and Jug B.
Jug A has a capacity of {{jugA}} liters, and Jug B has a capacity of {{jugB}} liters.
Currently, Jug A has {{currentA}} liters of water, and Jug B has {{currentB}} liters.
The player has made {{moves}} moves so far.

Provide a hint to help the player reach the target amount. The hint should be a single, actionable step.
After the hint, evaluate if it is helpful given the current game state and the number of moves made.

Example hint:
\"Try filling Jug A completely from the tap.\"

Output in JSON format:
{{$jsonOutput: GenerateHintOutput}}`,
});

const generateHintFlow = ai.defineFlow(
  {
    name: 'generateHintFlow',
    inputSchema: GenerateHintInputSchema,
    outputSchema: GenerateHintOutputSchema,
  },
  async input => {
    const {output} = await hintPrompt(input);
    return output!;
  }
);
