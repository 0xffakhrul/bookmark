export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Bookmark {
  _id: string;
  owner: string;
  url: string;
  name: string;
  comment?: string;
  tags: string[];
  __v: number;
}

export type BookmarkInput = {
  url: string;
  name: string;
  comment?: string;
  tags: string[];
};
