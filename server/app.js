import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasksRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Back works",
  });
});

app.get("/test", (req, res) => {
  res.json({ message: "Backend працює" });
});

export default app;
