import { Products } from './Products';

export interface Purchases {
  time: Date;
  user: string; // Save by user id
  product: Products;
  price: number;
  total: number; // Total account after purchase
  store: string; // Save by store id
}
