import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import TextInput from "./TextInput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { CreatePost, GenerateAIImage } from "../api";

const GenerateImageForm = ({
  post,
  setPost,
  createPostLoading,
  setGenerateImageLoading,
  generateImageLoading,
  setCreatePostLoading,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const generateImageFun = async () => {
    setGenerateImageLoading(true);
    await GenerateAIImage({ prompt: post.prompt })
      .then((res) => {
        setPost({
          ...post,
          photo: `data:image/jpge;base64,${res?.data?.photo}`,
        });
        setGenerateImageLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setGenerateImageLoading(false);
      });
  };
  const createPostFun = async () => {
    setCreatePostLoading(true);
    await CreatePost(post)
      .then((res) => {
        setCreatePostLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setCreatePostLoading(false);
      });
  };
  return (
    <div className="flex-1 p-4 flex flex-col gap-9 justify-center">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-medium text-primary">
          Generate Image with prompt
        </div>
        <div className="text-base font-normal text-secondary">
          Write your prompt according to the image you want to generate!
        </div>
      </div>
      <div className="flex flex-col gap-4 text-sm font-normal text-secondary">
        <TextInput
          label="Author"
          placeholder="Enter your name.."
          name="name"
          value={post.name}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Prompt"
          placeholder="Write a detailed prompt about the image . . . "
          name="name"
          rows="8"
          textArea
          value={post.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <div className="text-red-500">{error}</div>}
        <div className="text-center text-sm font-semibold text-secondary">
          ** You can post the AI Generated Image to the Community **
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          text="Generate Image"
          flex
          leftIcon={<AutoAwesome />}
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={() => generateImageFun()}
        />
        <Button
          text="Post Image"
          flex
          type="secondary"
          leftIcon={<CreateRounded />}
          isLoading={createPostLoading}
          isDisabled={
            post.name === "" || post.prompt === "" || post.photo === ""
          }
          onClick={() => createPostFun()}
        />
      </div>
    </div>
  );
};

export default GenerateImageForm;
