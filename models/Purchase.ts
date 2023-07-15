//import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";
/*
const PurchaseSchema = createSchema({
  time: Type.string({ required: true }),
  user: Type.string({ required: true }),
  store: Type.string({ required: true }),
  product: Type.string({ required: true }),
  price: Type.number({ required: true }),
  nameOfStore: Type.string({ required: true }),
  nameOfUser: Type.string({ required: true }),
  userAmount: Type.number({ required: true }),
  storeAmount: Type.number({ required: true }),
});

const PurchaseModel = typedModel("Purchase", PurchaseSchema, "Purchase");

type PurchaseDoc = ExtractDoc<typeof PurchaseSchema>;

export { PurchaseSchema, PurchaseModel, PurchaseDoc };
*/
import mongoose from 'mongoose';
const { Schema } = mongoose;

const PurchaseSchema = new Schema({
  time: { type: String, required: true },
  user: { type: String, required: true },
  store: { type: String, required: true },
  product: { type: String, required: true },
  price: { type: Number, required: true },
  nameOfStore: { type: String, required: true }, 
  nameOfUser: { type: String, required: true },
  userAmount: { type: Number, required: true },
  storeAmount: { type: Number, required: true },
});

export const PurchaseModel = mongoose.model("Purchase", PurchaseSchema, "Purchase");