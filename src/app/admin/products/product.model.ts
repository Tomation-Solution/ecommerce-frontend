export class Product {
  constructor(
    productName: string = '',
    productImage?: File,
    description: string = '',
    categoryId?: number,
    stockQuantity?: number,
    price?: number,
    manufacturer: string = ''
  ){}
}
