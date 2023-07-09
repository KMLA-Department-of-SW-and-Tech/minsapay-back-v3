import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";

const LoginSchema = createSchema({
  username: Type.string({ required: true, unique: true }),
  password: Type.string({ required: true }),
  userType: Type.string({ enum: ["user", "admin", "store"], required: true }),
  isAdmin: Type.boolean({ required: true }),
  user: Type.string(),
  store: Type.string(),
})

const LoginModel = typedModel("Login", LoginSchema, "Login");

type LoginDoc = ExtractDoc<typeof LoginSchema>;

export { LoginSchema, LoginModel, LoginDoc };