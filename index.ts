import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = 8800;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO || "");
    console.log("Connected To MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

app.listen(port, () => {
  connect();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
