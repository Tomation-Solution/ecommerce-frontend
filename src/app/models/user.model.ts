export interface Vendor {
  access_token: string;
  firstname: string;
  vendor_id: number;
  vendor_logo: string;
}
export interface Customer {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  dateCreated?: string;
}
export class Customers {
  firstName: string;
  lastName: string;
  email: any;
  phoneNumber: any;
  password: any;
  constructor(
    firstName = '',
    lastName = '',
    email = '',
    phoneNumber = '',
    password = '',
    dateCreated = ''
  ) { }
}
