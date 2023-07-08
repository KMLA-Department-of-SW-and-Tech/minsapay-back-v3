import { Schema, model } from "mongoose";
import { Purchases } from "../interface/Purchases";
import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";
import { ProductSchema } from "./Product";

/*
const PurchasesSchema = new Schema<Purchases>({
  time: {
    type: Date,
    required: true,
  },
  user: { // Save by user id
    type: String,
    required: true,
  },
  store: { // Save by store id
    type: String,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Products",
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});
*/

const PurchaseSchema = createSchema({
  time: Type.date({ required: true }),
  user: Type.string({ required: true }),
  store: Type.string({ required: true }),
  product: Type.ref(Type.objectId()).to("Products", ProductSchema),
  price: Type.number({ required: true }),
  total: Type.number({ required: true }),
});

const PurchasesModel = typedModel("Purchase", PurchaseSchema, "Purchase");

type PurchasesDoc = ExtractDoc<typeof PurchaseSchema>;

export { PurchaseSchema, PurchasesModel, PurchasesDoc };