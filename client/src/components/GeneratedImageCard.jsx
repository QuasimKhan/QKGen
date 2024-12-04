import { CircularProgress } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";
import React from "react";
import FileSaver from "file-saver";

const GeneratedImageCard = ({ src, loading }) => {
  return (
    <div className="flex md:mt-48  flex-col gap-6 items-center justify-center p-4 border-2 border-dashed border-yellow-500 text-yellow-500/80 rounded-2xl bg-black/10 shadow-md max-w-md mx-auto">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <CircularProgress
            style={{ color: "inherit", width: "48px", height: "48px" }}
          />
          <p className="text-yellow-500">Generating Your Image...</p>
        </div>
      ) : (
        <>
          {src ? (
            <div className="flex flex-col gap-4 items-center">
              <div className="relative w-full max-h-[500px]">
                <img
                  src={src}
                  alt="Generated"
                  className="w-full h-auto max-h-[500px] object-contain rounded-2xl bg-gray-900"
                />
              </div>
              {/* Download Button */}
              <button
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
                onClick={() => FileSaver.saveAs(src, "download.jpg")}
              >
                <DownloadRounded />
                Download Image
              </button>
            </div>
          ) : (
            <p className="text-yellow-500 text-center">Write a prompt to generate an image</p>
          )}
        </>
      )}
    </div>
  );
};

export default GeneratedImageCard;
