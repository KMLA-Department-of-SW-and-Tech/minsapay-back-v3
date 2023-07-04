import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
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
    ref: "Product",
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

export default model("Product", ProductSchema, "Products");
