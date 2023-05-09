import { Products } from "./Products";
import { Purchases } from "./Purchases";

export interface Store {
    name: string;
    products: Products[];
    purchases: Purchases[];
    balance: number;
}