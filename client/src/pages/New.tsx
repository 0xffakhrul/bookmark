import { useState } from "react";
import { useCreateBookmark } from "../api/bookmark";
import { BookmarkInput } from "../types/api";

export const New = () => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState("");

  const createBookmarkMutation = useCreateBookmark();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newBookmark: BookmarkInput = {
      url,
      name,
      comment: comment || undefined,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    createBookmarkMutation.mutate(newBookmark);

    console.log(newBookmark);
  };

  return (
    <div className="py-12 px-8 max-w-3xl mx-auto">
      <h2 className="text-white text-4xl font-bold pb-6">Add Bookmark</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="" className="label">
            URL
          </label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input bg-gray-700 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="" className="label">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input bg-gray-700 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="" className="label">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea bg-gray-700 w-full"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="" className="label">
            Tags
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input bg-gray-700 w-full"
            required
          />
        </div>
        <div className="space-x-4 pt-6">
          <button className="btn btn-primary" type="submit">
            Save
          </button>
          <button className="btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};
