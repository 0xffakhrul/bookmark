import express, { Request, Response } from "express";
import { protectRoute } from "../middleware/authMiddleware";
import { CustomRequest } from "../types/user.interface";
import { Bookmark } from "../models/Bookmark";

const router = express.Router();

router.get("/", protectRoute, async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User is not authenticated!" });
    }

    const bookmarks = await Bookmark.find({ owner: req.user._id });

    res.json(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: "Error fetching bookmarks", error });
  }
});

router.post("/", protectRoute, async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User is not authenticated!" });
    }

    const { url, name, comment, tags } = req.body;

    if (!url || !name) {
      return res.status(400).json({ message: "URL and name are required" });
    }

    const newBookmark = new Bookmark({
      owner: req.user._id,
      url,
      name,
      comment,
      tags,
    });

    await newBookmark.save();

    res.status(201).json({
      message: "Bookmark created successfully",
      bookmark: newBookmark,
    });
  } catch (error) {
    console.error("Error creating bookmark:", error);
    res.status(500).json({ message: "Error creating bookmark", error });
  }
});

router.put("/:id", protectRoute, async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { id } = req.params;
    const { url, name, comment, tags } = req.body;

    const bookmark = await Bookmark.findOne({ _id: id, owner: req.user._id });

    if (!bookmark) {
      return res.status(404).json({
        message: "Bookmark not found or you don't have permission to update it",
      });
    }

    if (url) bookmark.url = url;
    if (name) bookmark.name = name;
    if (comment !== undefined) bookmark.comment = comment;
    if (tags) bookmark.tags = tags;

    await bookmark.save();

    res.json({ message: "Bookmark updated successfully", bookmark });
  } catch (error) {
    console.error("Error updating bookmark:", error);
    res.status(500).json({ message: "Error updating bookmark", error });
  }
});

router.delete(
  "/:id",
  protectRoute,
  async (req: CustomRequest, res: Response) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const { id } = req.params;

      const result = await Bookmark.deleteOne({ _id: id, owner: req.user._id });

      res.json({ message: "Bookmark deleted successfully" });
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      res.status(500).json({ message: "Error deleting bookmark", error });
    }
  }
);

export default router;
