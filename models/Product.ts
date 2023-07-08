import { Schema, model } from "mongoose";
import { Products } from "../interface/Products";
import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";

/*
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
*/

const ProductSchema = createSchema({
  name: Type.string({ required: true }),
  price: Type.number({ required: true }),
})

const ProductsModel = typedModel("Products", ProductSchema, "Products");

type ProductsDoc = ExtractDoc<typeof ProductSchema>;

export { ProductSchema, ProductsModel, ProductsDoc };

//export default model<Products>("Purchases", ProductsSchema);
