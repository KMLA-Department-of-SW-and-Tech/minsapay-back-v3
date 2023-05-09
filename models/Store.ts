import { Schema, model } from "mongoose";
import { Store } from "../interface/Store";

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

export default model<Store>("Store", StoreSchema, "Store");
