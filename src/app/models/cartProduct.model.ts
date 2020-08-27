export class CartProducts {
  orders: CartProduct[];
  addressId: number;
  paymenttypeId: number;
}

export class CartProduct {
    // tslint:disable-next-line: variable-name
    product_image: string;
    // tslint:disable-next-line: variable-name
    product_id: number;
    quantity: number;
    cost: number;
}
