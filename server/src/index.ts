import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth";
import bookmarks from "./routes/bookmarks";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
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
app.use("/api/bookmarks", bookmarks);
