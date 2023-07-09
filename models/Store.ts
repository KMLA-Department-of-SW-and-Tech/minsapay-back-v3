import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";

const StoreSchema = createSchema({
  name: Type.string({ required: true }),
  purchases: Type.array().of(Type.string()),
  products: Type.array().of(Type.string()),
  balance: Type.number({ required: true }),
})

const StoreModel = typedModel("Store", StoreSchema, "Store");

type StoreDoc = ExtractDoc<typeof StoreSchema>;

export { StoreSchema, StoreModel, StoreDoc };
