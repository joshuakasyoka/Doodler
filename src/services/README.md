# Image Generation Service

This service provides image generation capabilities using AI models like OpenAI DALL-E or Stable Diffusion.

## Setup

### Option 1: OpenAI DALL-E (Recommended)

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env` file in the root directory:
   ```
   VITE_OPENAI_API_KEY=your_api_key_here
   ```
3. The service will automatically use DALL-E 2 for image generation

### Option 2: Stable Diffusion (Hugging Face)

1. Get your API key from [Hugging Face](https://huggingface.co/settings/tokens)
2. Create a `.env` file in the root directory:
   ```
   VITE_HUGGINGFACE_API_KEY=your_api_key_here
   VITE_STABLE_DIFFUSION_MODEL=stabilityai/stable-diffusion-2-1
   ```
3. Use `generateImageWithStableDiffusion()` instead of `generateImage()`

## Usage

The image generation is automatically integrated into the EditAnnotation component. When editing an annotation:

1. Enter a prompt in the image prompt field (or leave it empty to use chip + description)
2. Click the arrow icon button to generate an image
3. The generated image will replace the current image for that annotation

## API Functions

### `generateImage(prompt, options)`

Generates an image using OpenAI DALL-E API.

**Parameters:**
- `prompt` (string): Text description of the image to generate
- `options` (object, optional):
  - `size`: Image size ('256x256' | '512x512' | '1024x1024'), default: '512x512'
  - `n`: Number of images to generate, default: 1

**Returns:** Promise resolving to `{ imageUrl: string, error?: string }`

### `generateImageWithStableDiffusion(prompt, options)`

Generates an image using Stable Diffusion via Hugging Face API.

**Parameters:**
- `prompt` (string): Text description of the image to generate
- `options` (object, optional):
  - `negativePrompt`: Things to avoid in the image

**Returns:** Promise resolving to `{ imageUrl: string, error?: string }`

## Development Mode

If no API key is configured, the service will use mock image generation with placeholder images for development purposes.
