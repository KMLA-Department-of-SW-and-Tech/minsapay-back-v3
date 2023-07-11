import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";

const PurchaseSchema = createSchema({
  time: Type.date({ required: true }),
  user: Type.string({ required: true }),
  store: Type.string({ required: true }),
  product: Type.string({ required: true }),
  price: Type.number({ required: true }),
});

const PurchaseModel = typedModel("Purchase", PurchaseSchema, "Purchase");

type PurchaseDoc = ExtractDoc<typeof PurchaseSchema>;

export { PurchaseSchema, PurchaseModel, PurchaseDoc };
