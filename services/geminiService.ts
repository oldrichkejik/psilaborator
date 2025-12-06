import { DogConfig } from "../types";
import { STYLE_PROMPTS } from "../constants";

export const generateDogImage = async (config: DogConfig): Promise<string> => {
  const breedsString = config.breeds.join(" and ");
  const promptBuilder = STYLE_PROMPTS[config.style];

  if (!promptBuilder) {
    throw new Error("Invalid style selected");
  }

  const prompt = promptBuilder(breedsString, config.pose);
  
  // 1. Vytvoříme odkaz (použijeme model 'turbo', je rychlejší)
  const encodedPrompt = encodeURIComponent(prompt);
  const randomSeed = Math.floor(Math.random() * 1000000);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?nologo=true&seed=${randomSeed}&model=turbo&width=1024&height=1024`;

  try {
    // 2. TRIK: Stáhneme obrázek na pozadí a převedeme ho na "data"
    // Tím zajistíme, že se v aplikaci zobrazí okamžitě a prohlížeč ho nezablokuje.
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
        throw new Error("Obrázek se nepodařilo stáhnout");
    }

    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  } catch (error) {
    console.error("Chyba načítání:", error);
    // Kdyby stahování selhalo, vrátíme alespoň ten odkaz jako zálohu
    return imageUrl;
  }
};
