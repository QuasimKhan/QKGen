import React, { useState } from "react";
import GenerateImageForm from "../components/GenerateImageForm";
import GeneratedImageCard from "../components/GeneratedImageCard";
import Footer from "../components/Footer";

const CreatePost = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  return (
    <div className="min-h-screen bg-gray-900 py-20 flex flex-col items-center justify-between gap-12 overflow-y-auto">
      {/* Header Section */}
      <div className="text-center text-white space-y-6 animate-fadeIn">
        <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl text-yellow-400">
          Create Your AI Generated Post
        </h1>
        <p className="text-xl font-medium text-gray-300">
          Generate unique AI art and share your creation with the community!
        </p>
      </div>

      {/* Wrapper for form and generated image */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row gap-10 justify-center animate-fadeIn">
        {/* Generate Image Form */}
        <div className="w-full sm:w-1/2 flex flex-col items-center justify-center space-y-6">
          <GenerateImageForm
            post={post}
            setPost={setPost}
            createPostLoading={createPostLoading}
            setGenerateImageLoading={setGenerateImageLoading}
            generateImageLoading={generateImageLoading}
            setCreatePostLoading={setCreatePostLoading}
          />
        </div>

        {/* Generated Image */}
        <div className="w-full sm:w-1/2 flex flex-col items-center justify-center mt-8 px-4 sm:mt-0">
          <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg transition-all transform">
            {generateImageLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                <div className="text-white text-center">
                  <div className="animate-spin border-4 border-yellow-400 border-t-transparent rounded-full w-12"></div>
                  <p className="mt-2 text-lg">Generating Image...</p>
                </div>
              </div>
            ) : (
              <GeneratedImageCard
                src={post?.photo.slice(23)}
                loading={generateImageLoading}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default CreatePost;
