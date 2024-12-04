import { createError } from "../error.js";

export const generateImage = async (req, res, next) => {
  try {
    const { prompt, width = 896, height = 1408, seed = 869582994, model = "flux" } = req.body;

    // Base URL for Pollinations.ai
    const baseURL = "https://pollinations.ai/p/";

    // Constructing the image URL
    const imageUrl = `${baseURL}${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

    // Return only the constructed URL directly without fetching it
    return res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error("Error generating image URL:", error.message);
    next(createError(500, error.message || "Failed to generate image URL"));
  }
};
