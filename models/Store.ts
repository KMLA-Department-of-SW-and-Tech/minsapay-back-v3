import { Schema, model } from "mongoose";
import { Store } from "../interface/Store";
import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";
import { PurchaseSchema } from "./Purchase";
import { ProductSchema } from "./Product";


/*
const StoreSchema = new Schema<Store>({
  name: {
    type: String,
    required: true,
  },
  purchases: [
    {
      type: Schema.Types.ObjectId,
      ref: "Purchases",
    },
  ],
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  balance: {
    type: Number,
    required: true,
  },
});
*/

const StoreSchema = createSchema({
  name: Type.string({ required: true }),
  purchases: Type.array().of(Type.ref(Type.objectId()).to("Purchases", PurchaseSchema)),
  products: Type.array().of(Type.ref(Type.objectId()).to("Products", ProductSchema)),
  balance: Type.number({ required: true }),
})

const StoreModel = typedModel("Store", StoreSchema, "Store");

type StoreDoc = ExtractDoc<typeof StoreSchema>;

export { StoreSchema, StoreModel, StoreDoc };

//export default model<Store>("Store", StoreSchema, "Store");
