import { DogConfig } from "../types";
import { STYLE_PROMPTS } from "../constants";

export const generateDogImage = async (config: DogConfig): Promise<string> => {
  const breedsString = config.breeds.join(" and ");
  const promptBuilder = STYLE_PROMPTS[config.style];

  if (!promptBuilder) {
    throw new Error("Invalid style selected");
  }

  const prompt = promptBuilder(breedsString, config.pose);
  
  // Zvýšíme šanci na úspěch tím, že vynecháme složité parametry, necháme jen model a seed
  const encodedPrompt = encodeURIComponent(prompt);
  const randomSeed = Math.floor(Math.random() * 1000000);
  
  // Vracíme URL okamžitě. Načítání bude řešit Result.tsx
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?nologo=true&seed=${randomSeed}&model=flux&width=1024&height=1024`;
};
