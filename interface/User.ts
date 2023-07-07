import { Purchases } from "./Purchases";

export interface User {
  name: string;
  purchases: Purchases[];
  balance: number;
  isSecurePurchase: boolean;
  securePurchaseEndDate: Date;
}
