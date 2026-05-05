// Stubbed image generation service - not configured for Railway deployment
// Keep type exports for compatibility

export type GenerateImageOptions = {
  prompt: string;
  model?: string;
  size?: string;
  quality?: string;
  style?: string;
  n?: number;
};

export type GenerateImageResponse = {
  url: string;
};

/**
 * Generate image function - STUBBED
 * Throws error indicating image generation service is not configured
 */
export async function generateImage(
  options: GenerateImageOptions
): Promise<GenerateImageResponse> {
  throw new Error(
    "Image generation service is not configured. This feature requires an AI image generation API integration (DALL-E, Stable Diffusion, etc.) which has not been set up for this Railway deployment."
  );
}
