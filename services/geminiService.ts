import { DogConfig } from "../types";
import { STYLE_PROMPTS } from "../constants";

export const generateDogImage = async (config: DogConfig): Promise<string> => {
  // 1. Příprava popisu pro AI
  const breedsString = config.breeds.join(" and ");
  const promptBuilder = STYLE_PROMPTS[config.style];

  if (!promptBuilder) {
    throw new Error("Invalid style selected");
  }

  const prompt = promptBuilder(breedsString, config.pose);

  // 2. Vytvoření odkazu na Pollinations.ai
  // Používáme model 'flux', dělá moc hezké obrázky.
  const encodedPrompt = encodeURIComponent(prompt);
  const randomSeed = Math.floor(Math.random() * 1000000);
  
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?nologo=true&seed=${randomSeed}&width=1024&height=1024&model=flux`;

  // 3. Malá umělá pauza (2.5 sekundy)
  // To je trik: Uživatel uvidí točící se kolečko "Vytvářím...",
  // a mezitím už Pollinations na pozadí začne pracovat.
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Vrátíme přímý odkaz. Prohlížeč se pak postará o zobrazení.
  return imageUrl;
};
