export enum DogStyle {
  REALISTIC = "Realistická fotka",
  CARTOON = "Kreslená pohádka (Cartoon)",
  ANIMATION_3D = "3D Animace (Pixar styl)",
  SKETCH = "Tužková skica"
}

export enum DogPose {
  PROFILE = "Profil",
  FRONT = "Zepředu",
  RUNNING = "V běhu",
  SLEEPING = "Spící",
  PLAYING = "Hrající si"
}

export interface DogConfig {
  breeds: string[];
  pose: string;
  style: DogStyle;
  name: string;
}

export interface GeneratedImage {
  imageUrl: string;
  promptUsed: string;
}