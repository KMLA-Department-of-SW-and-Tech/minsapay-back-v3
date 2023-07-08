import { Schema, model } from "mongoose";
import { Login } from "../interface/Login";
import { User } from "../interface/User";
import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";
import { UserSchema } from "./User";
import { StoreSchema } from "./Store";


/*
const LoginSchema = new Schema<Login>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["user", "admin", "booth"],
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store",
  },
});
*/

const LoginSchema = createSchema({
  username: Type.string({ required: true, unique: true }),
  password: Type.string({ required: true }),
  userType: Type.string({ enum: ["user", "admin", "booth"], required: true }),
  isAdmin: Type.boolean({ required: true }),
  user: Type.ref(Type.objectId()).to("User", UserSchema),
  store: Type.ref(Type.objectId()).to("Store", StoreSchema),
})

const LoginModel = typedModel("Login", LoginSchema, "Login");

type LoginDoc = ExtractDoc<typeof LoginSchema>;

export { LoginSchema, LoginModel, LoginDoc };

// export default model<Login>("Login", LoginSchema, "Login");
