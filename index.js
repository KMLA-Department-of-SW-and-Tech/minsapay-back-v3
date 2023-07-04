import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("MINSAPAY BACKEND SERVER");
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

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log(
    `[server]: Server is running at http://localhost:${
      process.env.PORT || 8800
    }`
  );
});
