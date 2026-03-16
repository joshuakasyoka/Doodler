/**
 * Image Generation API Service
 * 
 * This service handles image generation from text prompts.
 * Currently supports OpenAI DALL-E API, but can be extended to support other services.
 */

export interface ImageGenerationOptions {
  size?: '256x256' | '512x512' | '1024x1024';
  n?: number; // Number of images to generate
}

export interface ImageGenerationResponse {
  imageUrl: string;
  error?: string;
}

/**
 * Generate an image from a text prompt using OpenAI DALL-E API
 * 
 * @param prompt - The text prompt describing the image to generate
 * @param options - Additional options for image generation
 * @returns Promise resolving to the generated image URL
 */
export async function generateImage(
  prompt: string,
  options: ImageGenerationOptions = {}
): Promise<ImageGenerationResponse> {
  const {
    size = '512x512',
    n = 1,
  } = options;

  // Get API key from environment variable
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    console.warn('OpenAI API key not found. Using mock image generation.');
    return generateMockImage(prompt);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-2', // or 'dall-e-3' for newer model
        prompt: prompt,
        n: n,
        size: size,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      return {
        imageUrl: data.data[0].url,
      };
    }

    throw new Error('No image URL returned from API');
  } catch (error) {
    console.error('Error generating image:', error);
    // If API call fails, fall back to mock image instead of returning empty
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
    console.warn('Falling back to mock image due to API error:', errorMessage);
    return generateMockImage(prompt);
  }
}

/**
 * Generate a mock image URL for development/testing
 * This creates a placeholder image using a data URL
 */
function generateMockImage(prompt: string): ImageGenerationResponse {
  // For development, create a simple SVG placeholder as a data URL
  // This avoids external dependencies and CORS issues
  const svg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#f0f0f0"/>
      <text x="256" y="240" font-family="Arial, sans-serif" font-size="18" fill="#666" text-anchor="middle">
        ${prompt.substring(0, 30)}${prompt.length > 30 ? '...' : ''}
      </text>
      <text x="256" y="280" font-family="Arial, sans-serif" font-size="14" fill="#999" text-anchor="middle">
        (Mock Image)
      </text>
    </svg>
  `.trim();
  
  const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
  const mockImageUrl = URL.createObjectURL(svgBlob);
  
  return {
    imageUrl: mockImageUrl,
  };
}

/**
 * Alternative: Generate image using Stable Diffusion API (Hugging Face)
 */
export async function generateImageWithStableDiffusion(
  prompt: string,
  options: { negativePrompt?: string } = {}
): Promise<ImageGenerationResponse> {
  const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  const model = import.meta.env.VITE_STABLE_DIFFUSION_MODEL || 'stabilityai/stable-diffusion-2-1';

  if (!apiKey) {
    console.warn('Hugging Face API key not found. Using mock image generation.');
    return generateMockImage(prompt);
  }

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: options.negativePrompt,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return {
      imageUrl,
    };
  } catch (error) {
    console.error('Error generating image with Stable Diffusion:', error);
    // If API call fails, fall back to mock image instead of returning empty
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
    console.warn('Falling back to mock image due to API error:', errorMessage);
    return generateMockImage(prompt);
  }
}
