export interface Product {
  product_id: number;
  description: string;
  manufacturer: string;
  category_id: number;
  price?: number;
  stock_quantity: number;
  product_name?: string;
  product_image?: string;
  date_created: string;
}
