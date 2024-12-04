import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/GenerateImage.js";
import e from "cors";
import morgan from "morgan";

dotenv.config();

// Validate critical environment variables
if (!process.env.MONGODB_URL) {
  console.error("❌ MONGODB_URL environment variable is required.");
  process.exit(1); // Exit the application if critical config is missing
}

const app = express();

// Middleware
app.use(cors(
  {
      origin: ["https://bxcwxc17-5173.inc1.devtunnels.ms", "http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));;

// Routes
app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

// Default route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to QKGEN API! 🚀",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`⚠️ Error: ${err.message || "Unknown error"}`);
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// MongoDB Connection
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit the application on database connection failure
  }
};

// Start Server
const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();

    // Start Express Server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`✅ Server started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting the server:", err.message);
    process.exit(1); // Exit the application on failure
  }
};

// Graceful Shutdown
const handleExit = (signal) => {
  console.log(`⚠️ Received ${signal}. Closing server gracefully...`);
  mongoose.connection.close(() => {
    console.log("✅ MongoDB connection closed.");
    process.exit(0);
  });
};

process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);

startServer();
