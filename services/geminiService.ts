import { DogConfig } from "../types";
import { STYLE_PROMPTS } from "../constants";

export const generateDogImage = async (config: DogConfig): Promise<string> => {
  // 1. Získáme správný popis stylu (zachováme tvou logiku pro Pixar/Realistické)
  const breedsString = config.breeds.join(" and ");
  const promptBuilder = STYLE_PROMPTS[config.style];
  
  if (!promptBuilder) {
    throw new Error("Invalid style selected");
  }

  const prompt = promptBuilder(breedsString, config.pose);

  // 2. Vytvoříme URL pro Pollinations.ai
  // Tato služba vygeneruje obrázek jen tím, že zavoláme její adresu
  const encodedPrompt = encodeURIComponent(prompt);
  const randomSeed = Math.floor(Math.random() * 1000000); // Náhodné číslo, aby byl každý pes unikátní
  
  // Sestavení finálního odkazu na obrázek
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?nologo=true&seed=${randomSeed}&width=1024&height=1024&model=flux`;

  // 3. Malá pauza (1.5s), aby to vypadalo, že aplikace "pracuje" (UX efekt)
  await new Promise(resolve => setTimeout(resolve, 1500));

  return imageUrl;
};
