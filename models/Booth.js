import { Schema, model } from "mongoose";

const BoothSchema = new Schema({
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

export default model("Booth", StoreSchema, "Booths");
