export interface User {
  name: string;
  purchases: string[];
  balance: number;
  isSecurePurchase: boolean;
  securePurchaseEndDate: Date;
}
