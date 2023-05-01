import { Schema, model } from "mongoose";
import { Store } from "../interface/Store";

const StoreSchema = new Schema<Store>({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
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
});

export default model<Store>("Store", StoreSchema);
