import axios from "axios";

const API = axios.create({
  baseURL: "https://qkgen.onrender.com",
});

export const GetPosts = async () => {

  return await API.get("/api/post/");
}
export const CreatePost = async (data) => {
  console.log(data);
  
  return await API.post("/api/post/", data)
};
export const GenerateAIImage = async (data) =>{

  
  return  await API.post("/api/generateImage/", data);
} 