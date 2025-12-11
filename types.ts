export enum ArtStyle {
  WARLI = 'Warli Art',
  PATTACHITRA = 'Odisha Pattachitra',
  BAPU = 'Bapu Art Style',
  MADHUBANI = 'Madhubani Art',
  NEON = 'Neon Heritage'
}

export interface GeneratedArt {
  id: string;
  url: string;
  style: ArtStyle;
  timestamp: number;
}

export interface ArtPrompt {
  style: ArtStyle;
  prompt: string;
  description: string;
}