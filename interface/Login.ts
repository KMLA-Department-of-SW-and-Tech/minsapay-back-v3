import { User } from "./User";
import { Store } from "./Store";

export interface Login {
  username: string;
  password: string;
  userType: string;
  isAdmin: boolean;
  user?: User;
  store?: Store;
}
