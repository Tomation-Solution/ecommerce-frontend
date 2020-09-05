export interface Orders{
   orders?: Order[];
   paymenttype_id?: number;
   address_id?: number;
  }

export interface Order{
    product_id: number;
    quantity: number;
    cost: number;
}

