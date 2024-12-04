import Post from "../models/Posts.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    next(createError(500, "Failed to fetch posts."));
  }
};

// Create Post
export const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;

    // Ensure required fields are provided
    if (!name || !prompt || !photo) {
      return next(createError(400, "Missing required fields (name, prompt, photo)."));
    }

    // Check if photo is a valid URL
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
        
      } catch (error) {
        return false;
      }
    };

    if (!isValidUrl(photo)) {
      return next(createError(400, "Invalid photo URL."));
    }

    // Upload the photo to Cloudinary
    const uploadedPhoto = await cloudinary.uploader.upload(photo, {
      folder: "posts", // Optional: Specify a folder in Cloudinary
    });

    console.log("Uploaded Photo URL:", uploadedPhoto?.secure_url);

    // Create a new post in the database
    const newPost = await Post.create({
      name,
      prompt,
      photo: uploadedPhoto?.secure_url, // Save the Cloudinary URL in the database
    });

    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("Error creating post:", error.message);
    next(createError(500, "Failed to create post."));
  }
};
