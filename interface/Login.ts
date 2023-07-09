export interface Login {
  username: string;
  password: string;
  userType: string;
  isAdmin: boolean;
  user?: string;
  store?: string;
}
