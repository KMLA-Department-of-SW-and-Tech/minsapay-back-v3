// import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";
import mongoose from 'mongoose';
const { Schema } = mongoose;

/*
const LoginSchema = createSchema({
  username: Type.string({ required: true, unique: true }),
  password: Type.string({ required: true }),
  userType: Type.string({ enum: ["user", "admin", "store"], required: true }),
  isAdmin: Type.boolean({ required: true }),
  user: Type.string(),
  store: Type.string(),
})

const LoginModel = typedModel("Login", LoginSchema, "Login");

type LoginDoc = ExtractDoc<typeof LoginSchema>;

export { LoginSchema, LoginModel, LoginDoc };
*/

const LoginSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["user", "admin", "store"], required: true },
  isAdmin: { type: Boolean, required: true },
  user: { type: String },
  store: { type: String },
});

export const LoginModel = mongoose.model("Login", LoginSchema, "Login");

