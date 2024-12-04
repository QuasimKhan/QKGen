import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";
import FileSaver from "file-saver";

const ImageCard = ({ item }) => {
  return (
    <div className="relative flex rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer group">
      {/* Lazy-loaded Image */}
      <LazyLoadImage
        alt={item?.prompt}
        className="w-full h-full rounded-lg object-cover"
        src={item?.photo}
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end gap-2 p-4 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Prompt Text */}
        <div className="text-white text-sm font-medium">{item?.prompt}</div>

        {/* Author and Download */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {/* Author Avatar */}
            <Avatar sx={{ width: "32px", height: "32px" }}>
              {item?.name[0]}
            </Avatar>
            <span className="text-white font-semibold text-sm">{item?.name}</span>
          </div>

          {/* Download Icon */}
          <DownloadRounded
            className="text-white cursor-pointer hover:text-yellow-400 transition-colors"
            onClick={() => FileSaver.saveAs(item?.photo, "download.jpg")}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
