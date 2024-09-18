import { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomRequest extends Request {
  user?: IUser;
}
