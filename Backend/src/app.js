import express from "express";
import { createServer } from "node:http";
// import { Server } from "socket.io";
import "dotenv/config";

import mongoose from "mongoose";
import connnectToSocket from "./controllers/socketManager.js";
import cors from "cors";

import userRoutes from "./routes/users.routes.js";

const app = express();

const server = createServer(app); // created server to connect app and io
const io = connnectToSocket(server); // initialized socket with server

app.set("port", process.env.PORT || 8000);

app.get("/", (req, res) => {
  res.send("Meetly Backend is running!");
});

app.use(cors());

app.use(express.json({ limit: "40kb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "40kb",
  })
);

app.use("/api/v1/users", userRoutes);

const start = async () => {
  const connectionDb = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB Connected: ${connectionDb.connection.host}`);

  server.listen(app.get("port"), () => {
    console.log(`Starting server... http://localhost:${app.get("port")}`);
  });
};

start();