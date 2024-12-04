import { createError } from "../error.js";

export const generateImage = async (req, res, next) => {
  try {
    // Extract and validate required fields
    const { prompt, width = 896, height = 1408, seed = 869582994, model = "flux" } = req.body;

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return next(createError(400, "The 'prompt' field is required and must be a non-empty string."));
    }

    // Ensure width and height are positive integers
    const sanitizedWidth = Math.max(parseInt(width, 10), 1);
    const sanitizedHeight = Math.max(parseInt(height, 10), 1);

    // Use environment variable for base URL, fallback to default
    const baseURL = process.env.POLLINATIONS_BASE_URL || "https://pollinations.ai/p/";

    // Construct the image URL
    const imageUrl = `${baseURL}${encodeURIComponent(prompt.trim())}?width=${sanitizedWidth}&height=${sanitizedHeight}&seed=${seed}&model=${model}`;


    console.log(imageUrl);
    // Return the constructed URL
    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error("Error generating image URL:", error.message);
    next(createError(500, "An unexpected error occurred while generating the image URL."));
  }
};
