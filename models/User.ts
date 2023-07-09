import { User } from "../interface/User";
import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";
import { PurchaseSchema } from "./Purchase";

const UserSchema = createSchema({
  name: Type.string({ required: true }),
  purchases: Type.array().of(Type.ref(Type.objectId()).to("Purchases", PurchaseSchema)),
  balance: Type.number({ required: true }),
  isSecurePurchase: Type.boolean({ required: true }),
  securePurchaseEndDate: Type.date({ required: true }),
})

const UserModel = typedModel("User", UserSchema, "User");

type UserDoc = ExtractDoc<typeof UserSchema>;

export { UserSchema, UserModel, UserDoc };