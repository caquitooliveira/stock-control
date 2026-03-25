export interface SaleProductResponse {
  product_id: string | number | boolean | readonly (string | number | boolean)[];
  id: string;
  name: string;
  amount: number;
}
