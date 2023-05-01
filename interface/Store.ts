import { Products } from "./Products";
import { Purchases } from "./Purchases";

export interface Store {
    username: string;
    name: string;
    password: string;
    products: Products[];
    purchases: Purchases[];
}