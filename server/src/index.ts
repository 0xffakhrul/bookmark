import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`RUNNING ${port}`);
});

const mongoURI: string = process.env.MONGO_URI!;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("CONNECTED!");
  } catch (error) {
    console.log("ERROR!", error);
  }
};

connectDB();

app.use("/api/auth", auth);
