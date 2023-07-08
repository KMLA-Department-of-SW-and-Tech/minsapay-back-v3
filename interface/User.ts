import { Purchases } from "./Purchases";
import { PopulatedDoc } from "mongoose";

export interface User {
  name: string;
  purchases: PopulatedDoc<Purchases>[];
  balance: number;
  isSecurePurchase: boolean;
  securePurchaseEndDate: Date;
}
