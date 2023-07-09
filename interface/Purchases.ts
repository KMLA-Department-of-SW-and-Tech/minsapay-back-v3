import { Products } from './Products';

export interface Purchases {
  time: Date;
  user: string; // Save by user id
  product: string;
  price: number;
  total: number; // Total account after purchase
  store: string; // Save by store id
}
