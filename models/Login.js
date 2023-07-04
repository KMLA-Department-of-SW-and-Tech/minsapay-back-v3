import { Schema, model } from "mongoose";

const LoginSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["admin", "user", "booth"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  booth: {
    type: Schema.Types.ObjectId,
    ref: "Booth",
  }
});

export default model("Login", LoginSchema, "Login");