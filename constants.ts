import { DogStyle, DogPose } from './types';

export const BREEDS = [
  "Akita Inu",
  "Aljašský malamut",
  "Anglický buldok",
  "Australský ovčák",
  "Basenji",
  "Baset",
  "Bernardýn",
  "Bernský salašnický pes",
  "Bígl",
  "Bišonek",
  "Border kolie",
  "Bostonský teriér",
  "Boxer",
  "Bullteriér",
  "Čau-čau",
  "Čivava",
  "Corgi",
  "Dalmatin",
  "Dobrman",
  "Francouzský buldoček",
  "Havanský psík",
  "Chrt",
  "Husky",
  "Jack Russell Teriér",
  "Jezevčík",
  "Jorkšír",
  "Kavalír King Charles Španěl",
  "Knírač",
  "Kokršpaněl",
  "Kollie",
  "Labrador",
  "Maďarský ohař",
  "Maltézský psík",
  "Mops",
  "Německá doga",
  "Německý ovčák",
  "Novofundlandský pes",
  "Papillon",
  "Pitbul",
  "Pomeranian",
  "Pudl",
  "Rotvajler",
  "Samojed",
  "Šarpej",
  "Shih Tzu",
  "Shiba Inu",
  "Skotský teriér",
  "Špringršpaněl",
  "Stafordšírský bulteriér",
  "Vipet",
  "Výmarský ohař",
  "Westík",
  "Zlatý retrívr"
];

export const STYLES = [
  DogStyle.REALISTIC,
  DogStyle.CARTOON,
  DogStyle.ANIMATION_3D,
  DogStyle.SKETCH
];

export const POSES = [
  DogPose.PROFILE,
  DogPose.FRONT,
  DogPose.RUNNING,
  DogPose.SLEEPING,
  DogPose.PLAYING
];

// Map Czech styles to specific prompt instructions
export const STYLE_PROMPTS: Record<DogStyle, (breeds: string, pose: string) => string> = {
  [DogStyle.REALISTIC]: (breeds, pose) => 
    `A highly detailed, photorealistic macro photograph of a hybrid dog mix of ${breeds}. 8k resolution, detailed fur texture, cinematic lighting, shot on DSLR, sharp focus, natural colors. Pose: ${pose}.`,
  [DogStyle.CARTOON]: (breeds, pose) => 
    `A colorful cartoon style drawing of a hybrid dog mix of ${breeds}. Child-friendly, simple lines, bright colors, 2D illustration. Pose: ${pose}.`,
  [DogStyle.ANIMATION_3D]: (breeds, pose) => 
    `A cute 3D rendered character of a hybrid dog mix of ${breeds}, Pixar style, vibrant colors, soft studio lighting, high fidelity, octane render. Pose: ${pose}.`,
  [DogStyle.SKETCH]: (breeds, pose) => 
    `A charcoal and pencil sketch of a hybrid dog mix of ${breeds}. Artistic, black and white, hand-drawn style, rough paper texture. Pose: ${pose}.`
};