import { Purchases } from "./Purchases";
import { PopulatedDoc } from "mongoose";

export interface User {
  name: string;
  purchases: string[];
  balance: number;
  isSecurePurchase: boolean;
  securePurchaseEndDate: Date;
}
