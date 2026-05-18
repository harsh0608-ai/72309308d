import express from "express";
import cors from "cors";
import { Log } from "../../logging_middleware/logger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend server running",
  });
});

app.get("/health", async (req, res) => {
  await Log(
    "backend",
    "info",
    "route",
    "Health route accessed"
  );

  res.json({
    status: "OK",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});