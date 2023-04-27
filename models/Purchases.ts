import { Schema, model } from "mongoose";
import { Purchases } from "../interface/Purchases";

const PurchasesSchema = new Schema<Purchases>({
  time: {
    type: Date,
    required: true,
  },
  user: {
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
  store: {
    type: String,
    required: true,
  },
});

export default model<Purchases>("Purchases", PurchasesSchema);
