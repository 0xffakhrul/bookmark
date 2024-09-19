import mongoose, { Schema } from "mongoose";

const bookmarkSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  name: { type: String, required: true },
  comment: { type: String },
  tags: [{ type: String }],
});

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
