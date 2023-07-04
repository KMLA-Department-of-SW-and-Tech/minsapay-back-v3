import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
  },
  purchases: [
    {
      type: Schema.Types.ObjectId,
      ref: "Purchases",
    },
  ],
  balance: {
    type: Number,
    required: true,
  },
  isSecurePurchase: {
    type: Boolean,
    required: true,
  },
  securePurchaseEndDate: {
    type: Date,
    required: false,
  },
});

export default model("User", UserSchema, "Users");
