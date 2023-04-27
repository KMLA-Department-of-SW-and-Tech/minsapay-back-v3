import { Schema, model } from "mongoose";
import { User } from "../interface/User";

const UserSchema = new Schema<User>({
  username: {
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
});

export default model<User>("User", UserSchema);
