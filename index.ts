import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";

import userRouter from "./routes/user";
import authRouter from './routes/auth';

dotenv.config();

const app: Express = express();

app.use(express.json())



app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());

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

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log(`[server]: Server is running at http://localhost:${process.env.PORT || 8800}`);
});
