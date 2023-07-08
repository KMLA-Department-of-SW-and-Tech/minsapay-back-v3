import { User } from "./User";
import { Store } from "./Store";
import { PopulatedDoc } from "mongoose";

export interface Login {
  username: string;
  password: string;
  userType: string;
  isAdmin: boolean;
  user?: PopulatedDoc<User>;
  store?: PopulatedDoc<Store>;
}
