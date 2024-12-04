import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import { GetPosts } from "../api";
import Footer from "../components/Footer";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    await GetPosts()
      .then((res) => {
        setLoading(false);
        setPosts(res?.data?.data);
        setFilteredPosts(res?.data?.data);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!search) {
      setFilteredPosts(posts);
    }

    const SearchFilteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt
        ?.toLowerCase()
        .includes(search.toString().toLowerCase());
      const authorMatch = post?.name
        ?.toLowerCase()
        .includes(search.toString().toLowerCase());

      return promptMatch || authorMatch;
    });

    if (search) {
      setFilteredPosts(SearchFilteredPosts);
    }
  }, [posts, search]);

  return (
    <div className="min-h-screen bg-gray-900 py-16 flex flex-col items-center justify-between gap-12 overflow-y-auto pb-20"> {/* Added padding-bottom */}
      {/* Header Section */}
      <motion.div
        className="text-center text-white space-y-6 animate-fadeIn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-yellow-400">
          Explore Popular Posts in the Community
        </h1>
        <p className="text-xl font-semibold text-gray-300">⦿ Generated with AI ⦿</p>
      </motion.div>

      {/* Search Bar */}
      <div className="w-full flex justify-center mx-auto mb-6"> {/* Centering the search bar */}
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {/* Posts Section */}
      <div className="w-full max-w-7xl mx-auto">
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}
        {loading ? (
          <div className="flex justify-center mt-12">
            <CircularProgress className="text-yellow-400" size={60} />
          </div>
        ) : (
          <div className="grid px-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
            {filteredPosts.length === 0 ? (
              <div className="text-white text-center col-span-full">No Posts Found</div>
            ) : (
              filteredPosts
                .slice()
                .reverse()
                .map((item, index) => (
                  <motion.div
                    key={index}
                    className="transform transition-all hover:scale-105 duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 0.98 }}
                      className="relative rounded-lg overflow-hidden shadow-lg bg-black hover:bg-gray-800 transition duration-300"
                    >
                      <ImageCard item={item} />
                    </motion.div>
                  </motion.div>
                ))
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
