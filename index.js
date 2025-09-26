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
    throw new Error("Create Error!");
  } catch (error) {
    console.log("Failed Create:", error.message);
    initiateShutdown(); // panggil function shutdown
    res.status(500).send("FAILED_CREATE");
  }
});

app.get("/data", async (req, res) => {
  // simulasi query lama
  await new Promise((r) => setTimeout(r, 10000));
  res.json({ data: "hello" });
});

const server = app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

function initiateShutdown() {
  isShuttingDown = true; // tolak request baru
  server.close(() => {
    console.log("All requests finished, shutting down...");
    process.exit(1);
  });
}
