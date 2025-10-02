const express = require("express");

const app = express();
let isShuttingDown = false;

app.use((req, res, next) => {
  if (isShuttingDown) {
    return res.status(503).send("Server is shutting down");
  }
  next();
});

app.post("/create", async (req, res) => {
  try {
    console.log("hit");
    
    throw new Error("Create Error!");
  } catch (error) {
    console.log("Failed Create:", error.message);
    res.status(500).send("FAILED_CREATE");
  }
});

app.get("/data/user", async (req, res) => {
  await new Promise((r) => setTimeout(r, 10000));
  res.json({ data: "hello user" });
});

const server = app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

function initiateShutdown(signal) {
  console.log(`\n⚠️ Received ${signal}. Starting graceful shutdown...`);
  isShuttingDown = true; // tolak request baru
  server.close(() => {
    console.log("All requests finished, shutting down...");
    process.exit(0);
  });
}

process.on("SIGTERM", () => initiateShutdown("SIGTERM"));
process.on("SIGINT", () => initiateShutdown("SIGINT"));