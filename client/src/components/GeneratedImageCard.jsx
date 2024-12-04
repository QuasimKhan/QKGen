import { CircularProgress } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";
import React from "react";
import FileSaver from "file-saver";

const GeneratedImageCard = ({ src, loading }) => {
  const handleDownload = () => {
    // This ensures the image is downloaded
    if (src) {
      FileSaver.saveAs(src, "download.jpg");
    }
  };

  return (
    <div className="flex-1  flex flex-col gap-4 items-center justify-center p-4 border-2 border-dashed border-yellow-500 text-yellow-500/80 rounded-2xl">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center bg-black/50 rounded-3xl">
          <div className="text-white text-center">
            <CircularProgress style={{ color: "inherit", width: "24px", height: "24px" }} />
            <p className="mt-2 text-lg">Wait, the image is loading...</p>
          </div>
        </div>
      ) : (
        <>
          {src ? (
            <>
              {/* Generated Image */}
              <div className="relative w-full  bg-black rounded-3xl overflow-hidden">
                <img
                  src={src}
                  alt="Generated"
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="absolute  bottom-4 right-4 p-3 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-400 transition-colors transform hover:scale-110 focus:outline-none"
                >
                  <DownloadRounded style={{ fontSize: 36 }} />
                </button>
              </div>
            </>
          ) : (
            <p className="text-lg text-yellow-400">Write a prompt to generate an image</p>
          )}
        </>
      )}
    </div>
  );
};

export default GeneratedImageCard;
