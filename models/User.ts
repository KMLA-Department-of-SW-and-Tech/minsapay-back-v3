import { Schema, model } from "mongoose";
import { User } from "../interface/User";

const UserSchema = new Schema<User>({
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

export default model<User>("User", UserSchema, "User");
