import { Schema, model } from "mongoose";
import { Purchases } from "../interface/Purchases";
import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";
import { ProductSchema } from "./Product";

const PurchaseSchema = createSchema({
  time: Type.date({ required: true }),
  user: Type.string({ required: true }),
  store: Type.string({ required: true }),
  product: Type.string({ required: true }),
  price: Type.number({ required: true }),
  total: Type.number({ required: true }),
});

const PurchasesModel = typedModel("Purchase", PurchaseSchema, "Purchase");

type PurchasesDoc = ExtractDoc<typeof PurchaseSchema>;

export { PurchaseSchema, PurchasesModel, PurchasesDoc };