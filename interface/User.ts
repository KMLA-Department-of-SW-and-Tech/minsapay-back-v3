import { Purchases } from "./Purchases";

export interface User {
    username: string;
    name: string;
    password: string;
    purchases: Purchases[];
    balance: number;
    isSecurePurchase: boolean;
    securePurchaseEndDate: Date;
}