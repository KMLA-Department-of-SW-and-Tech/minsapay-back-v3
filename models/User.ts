// import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";
// import { PurchaseSchema } from "./Purchase";
/*
const UserSchema = createSchema({
  name: Type.string({ required: true }),
  purchases: Type.array().of(Type.string()),
  balance: Type.number({ required: true }),
  isSecurePurchase: Type.boolean({ required: true }),
  securePurchaseEndDate: Type.date({ required: true }),
})

const UserModel = typedModel("User", UserSchema, "User");

type UserDoc = ExtractDoc<typeof UserSchema>;

export { UserSchema, UserModel, UserDoc };*/

import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  purchases: { type: Array, required: true },
  balance: { type: Number, required: true },
  isSecurePurchase: { type: Boolean, required: true },
  securePurchaseEndDate: { type: Date, required: true },
});

export const UserModel = mongoose.model("User", UserSchema, "User");
