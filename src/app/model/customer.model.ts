export class Customer {
  customerId: number;
  customerName: string;
  customerCity: string;
  mobileNo: string;
  email: string;

  constructor() {
    this.customerName = '';
    this.customerId = 0;
    this.customerCity = '';
    this.mobileNo = '';
    this.email = '';
  }
}
