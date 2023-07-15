import { Schema, model } from "mongoose";
import { Products } from "../interface/Products";
// import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";
/*
const ProductSchema = createSchema({
  name: Type.string({ required: true }),
  price: Type.number({ required: true }),
})

const ProductsModel = typedModel("Product", ProductSchema, "Product");

type ProductsDoc = ExtractDoc<typeof ProductSchema>;

export { ProductSchema, ProductsModel, ProductsDoc }; */

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export const ProductsModel = model("Product", ProductSchema, "Product");