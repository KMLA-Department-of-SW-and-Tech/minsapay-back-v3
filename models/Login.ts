import { Schema, model } from "mongoose";
import { Login } from "../interface/Login";

const LoginSchema = new Schema<Login>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["user", "admin", "booth"],
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store",
  },
});

export default model<Login>("Login", LoginSchema, "Login");
