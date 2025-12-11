import { ArtStyle, ArtPrompt } from './types';

export const ART_PROMPTS: Record<ArtStyle, ArtPrompt> = {
  [ArtStyle.WARLI]: {
    style: ArtStyle.WARLI,
    description: "Tribal stick-figure art with rhythmic symmetry from Maharashtra.",
    prompt: `Create a Warli Art–inspired gallery scene in a clean, minimalist vibe-coding style. 
Use monochrome lines, geometric shapes, and rhythmic symmetry. 
Include traditional Warli elements: tribal stick-figure people, circular dance patterns, animals, huts, trees, ladders, and sun motifs. 
Arrange multiple framed artworks on a gallery wall, each with a unique Warli art story—festivals, farming, hunting, dancing, daily village life.
Use white line illustrations on earthy brown and deep red backgrounds. 
Maintain hand-painted texture and natural roughness. 
Lighting should be warm and soft, like a curated museum exhibition. 
Overall atmosphere: culturally rich, serene, elegant, and deeply traditional.`
  },
  [ArtStyle.PATTACHITRA]: {
    style: ArtStyle.PATTACHITRA,
    description: "Intricate cloth-based scroll painting tradition from Odisha.",
    prompt: `Create a detailed Odisha Pattachitra–style artwork with intricate linework, bold outlines, and vibrant natural colors.
Feature traditional themes such as mythological stories of Jagannath, Balabhadra, Subhadra, Krishna Leela, Dashavatara, village life, or Odissi dance.
Use symmetrical composition, decorative floral borders, and finely patterned backgrounds.
Color palette: bright reds, yellows, indigo blues, black outlines, and earthy tones.
Include ornate motifs—lotus patterns, flowing vines, conch shells, wheels, and stylized animals.
Maintain the classic handcrafted look with fine brush strokes and natural texture.
Visual atmosphere should feel sacred, storytelling-oriented, culturally rich, and traditional to Odisha’s heritage.`
  },
  [ArtStyle.BAPU]: {
    style: ArtStyle.BAPU,
    description: "Minimalist, soulful linework style by the legendary Bapu.",
    prompt: `Create an illustration in the classic Bapu art style. 
Use minimal, elegant linework with smooth, flowing curves.
Depict expressive Indian characters with gentle, graceful gestures.
Give the figures big, soulful eyes, soft smiles, and simple yet emotional facial expressions.
Use delicate outlines, light shading, and clean negative space.
Add traditional Indian cultural elements—sarees, turbans, rural scenes, mythological characters, or everyday life moments.
Color palette: soft pastels, warm earthy tones, or simple two-tone ink style.
Overall mood: calm, nostalgic, poetic, and full of warmth.`
  },
  [ArtStyle.MADHUBANI]: {
    style: ArtStyle.MADHUBANI,
    description: "Vibrant folk art from Mithila, characterized by geometric patterns and nature.",
    prompt: `Create a traditional Madhubani (Mithila) painting.
Use double-line borders, filled with intricate cross-hatching and geometric patterns.
Subject: Nature scenes (birds, fish, turtles, trees of life), deities, or festive rituals.
Colors: Vibrant natural dyes—ochre yellow, deep red, bright green, and indigo blue, on a textured handmade paper background.
Key technique: No empty space; fill gaps with flowers, leaves, and geometric shapes.
Features: Facial profiles with large, almond-shaped eyes and pointed noses.
Vibe: Folk, earthy, intricate, and celebrating nature.`
  },
  [ArtStyle.NEON]: {
    style: ArtStyle.NEON,
    description: "A futuristic fusion of traditional motifs and cyberpunk neon aesthetics.",
    prompt: `Create a 'Neon Heritage' art piece that fuses ancient Indian art with cyberpunk aesthetics.
Reimagine traditional motifs—such as intricate mandalas, lotus flowers, paisley patterns, or stylized mythological figures—constructed entirely from glowing neon glass tubes.
Background: Dark, moody industrial texture (brick or metal grid) or deep midnight violet to maximize contrast.
Colors: High-voltage electric pinks, cyan blues, lime greens, and bright oranges against the dark background.
Style: Luminous, sleek, and modern. Focus on the 'glow' effect and light reflections.
Atmosphere: Energetic, futuristic, yet culturally rooted. A blend of the old world and the electric future.`
  }
};