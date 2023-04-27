import { Purchases } from "./Purchases";

export interface User {
    username: string;
    password: string;
    purchases: Purchases[];
}