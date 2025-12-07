import { DogConfig } from "../types";
import { STYLE_PROMPTS } from "../constants";

export const generateDogImage = async (config: DogConfig): Promise<string> => {
  const breedsString = config.breeds.join(" and ");
  const promptBuilder = STYLE_PROMPTS[config.style];

  if (!promptBuilder) {
    throw new Error("Invalid style selected");
  }

  const prompt = promptBuilder(breedsString, config.pose);
  
  // Zjednodušení a změna modelu na 'flux-realism' pro lepší stabilitu
  const encodedPrompt = encodeURIComponent(prompt);
  const randomSeed = Math.floor(Math.random() * 1000000);
  
  // Přidáváme 'nologo=true' a 'enhance=false' pro rychlejší odezvu
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?nologo=true&seed=${randomSeed}&model=flux-realism&width=1024&height=1024`;
};
