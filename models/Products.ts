import { Schema, model } from "mongoose";
import { Products } from "../interface/Products";

const ProductsSchema = new Schema<Products>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default model<Products>("Purchases", ProductsSchema);
